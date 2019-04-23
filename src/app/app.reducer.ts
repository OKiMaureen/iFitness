import {ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducer';

export interface State{
    ui: fromUI.State,
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUI.UiReducer,
    auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsloading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth= createSelector(getAuthState, fromAuth.getIsAuth);

