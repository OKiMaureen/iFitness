import { Program } from './program.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject,  } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiService } from '../shared/ui.service';

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
        private uiService: UiService
        ) {
        
    }


    private addProgramToDatabase(program: Program){
        this.db
        .collection('finishedPrograms')
        .add(program);

    }

    fetchAvailablePrograms(){
        this.uiService.loadingStateChanged.next(true);
        this.firebaseSub.push(this.db
        .collection<Program>('availablePrograms')
        .snapshotChanges()
        .pipe(map(docArray =>{
          return docArray.map(doc =>{
            let program: Program ={
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories,
            }
            return program;
            
          
          })
        }))
        .subscribe((programs: Program[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availablePrograms = programs;
            this.programsChanged.next([...this.availablePrograms]);
        }, error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar("Couldn't fetch  programs, please try again later", null, 3000)
            this.programChanged.next(null);
        }));
    }

    startProgram(programId:string){
        this.currentProgram = this.availablePrograms.find(program => program.id === programId)
        this.programChanged.next({...this.currentProgram});
    }
    completeProgram(){
        this.addProgramToDatabase(
            {
            ...this.currentProgram,
            date: new Date(),
            state: 'completed'
            }
        );
        this.currentProgram = null;
        this.programChanged.next(null);
    }

    cancelProgram(progress:number){ 
        this.addProgramToDatabase(
            {
            ...this.currentProgram,
            date: new Date(),
            state: 'cancelled',
            duration:this.currentProgram.duration * (progress * 100),
            calories: this.currentProgram.calories * (progress * 100),
            }
        );
        this.currentProgram = null;
        this.programChanged.next(null);
    }

    getCurrentProgram(){
        return {...this.currentProgram}; 
    }

    fetchCompletedOrCancelledProgram(){
        this.firebaseSub.push(this.db
        .collection('finishedPrograms')
        .valueChanges()
        .subscribe((programs: Program[])=>{
            this.finishedProgramsChanged.next(programs)
        }));
    }
    
    closeSubscriptions(){
        this.firebaseSub.forEach(sub=>sub.unsubscribe()); 

    }

    
}
