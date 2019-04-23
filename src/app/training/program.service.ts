import { Program } from './program.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject,  } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UiService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.action';
import * as fromTraining from '../training/training.reducer';

@Injectable()
export class ProgramService{
    programChanged= new Subject<Program>();
    programsChanged = new Subject<Program[]>();
    finishedProgramsChanged = new Subject<Program[]>();
    private availablePrograms: Program[] = [];
    private currentProgram: Program;
    private firebaseSub: Subscription[] = []


    constructor(
        private db: AngularFirestore,
        private uiService: UiService,
        private store: Store<fromTraining.State>
        ) {
        
    }


    private addProgramToDatabase(program: Program){
        this.db
        .collection('finishedPrograms')
        .add(program);

    }

    fetchAvailablePrograms(){
        this.store.dispatch(new UI.StartLoading());
        this.firebaseSub.push(this.db
        .collection<Program>('availablePrograms')
        .snapshotChanges()
        .pipe(map(docArray =>{
          return docArray.map(doc =>{
           return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories,
            };
            });
        }))
        .subscribe((programs: Program[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailablePrograms(programs));
        }, error => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackBar("Couldn't fetch  programs, please try again later", null, 3000)
            this.programChanged.next(null);
        }));
    }

    startProgram(programId:string){
        this.store.dispatch(new Training.StartProgram(programId));
    }
    completeProgram(){
        this.store.select(fromTraining.getActiveProgram).pipe(take(1)).subscribe(program =>{
            this.addProgramToDatabase(
                {
                ...program,
                date: new Date(),
                state: 'completed'
                });
                this.store.dispatch(new Training.StopProgram());
        });
        
      
    }

    cancelProgram(progress:number){
        this.store.select(fromTraining.getActiveProgram).pipe(take(1)).subscribe(program =>{
            this.addProgramToDatabase(
                {
                ...program,
                date: new Date(),
                state: 'cancelled',
                duration:program.duration * (progress * 100),
                calories: program.calories * (progress * 100),
                });
            this.store.dispatch(new Training.StopProgram());
        });
    }

    fetchCompletedOrCancelledProgram(){
        this.firebaseSub.push(this.db
        .collection('finishedPrograms')
        .valueChanges()
        .subscribe((programs: Program[])=>{
            this.store.dispatch(new Training.SetFinishedPrograms(programs));
        }));
    }
    
    closeSubscriptions(){
        this.firebaseSub.forEach(sub=>sub.unsubscribe()); 

    }

    
}
