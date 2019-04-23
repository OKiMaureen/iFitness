import  {SET_AVAILABLE_PROGRAMS, SET_FINISHED_PROGRAMS, START_PROGRAM, STOP_PROGRAM} from './training.action'
import { Program } from './program.model';
import * as fromRoot from '../app.reducer';
import { TrainingActions } from '../training/training.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availablePrograms: Program[];
    finishedPrograms: Program[];
    activeProgram: Program;
}

export interface State extends fromRoot.State {
    training : TrainingState
}

const initialState: TrainingState = {
    availablePrograms: [],
    finishedPrograms: [],
    activeProgram: null
}
export function trainingReducer (state=initialState, action:TrainingActions) {
    switch(action.type){
        case SET_AVAILABLE_PROGRAMS:
        return{
            ...state,
            availablePrograms: action.payload
        };
        case SET_FINISHED_PROGRAMS:
        return{
            ...state,
            finishedPrograms: action.payload
        };
        case START_PROGRAM:
        return{
            ...state,
            activeProgram: {...state.availablePrograms.find(program => program.id === action.payload)}
        };
        case STOP_PROGRAM:
        return{
            ...state,
            activeProgram: null
        };
        default: 
        return state;
    }
}
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailablePrograms= createSelector(getTrainingState, (state:TrainingState) => state.availablePrograms);
export const getFinishedPrograms= createSelector(getTrainingState, (state:TrainingState) => state.finishedPrograms);
export const getActiveProgram= createSelector(getTrainingState,(state:TrainingState) => state.activeProgram);
export const getIsTraining= createSelector(getTrainingState,(state:TrainingState) => state.activeProgram != null);
