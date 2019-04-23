import {Action} from '@ngrx/store';
import { Program } from './program.model'

export const SET_AVAILABLE_PROGRAMS = '[Training] set available programs';
export const SET_FINISHED_PROGRAMS = 'Training] set finished programs';
export const START_PROGRAM  = '[Training] start program';
export const STOP_PROGRAM  = '[Training] stop program';

export class SetAvailablePrograms implements Action{
    readonly type = SET_AVAILABLE_PROGRAMS;
    constructor(public payload: Program[]){};
}

export class SetFinishedPrograms implements Action{
    readonly type = SET_FINISHED_PROGRAMS;
    constructor(public payload: Program[]){}
}

export class StartProgram implements Action{
    readonly type = START_PROGRAM;
    constructor(public payload: string ){}
}

export class StopProgram implements Action{
    readonly type = STOP_PROGRAM;
}

export type TrainingActions = SetAvailablePrograms | SetFinishedPrograms | StartProgram | StopProgram   ;
