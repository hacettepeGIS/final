import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromReducer from "./profile.reducer";

export const getProfileState = createFeatureSelector<fromReducer.ProfileState>(
  "profile"
);

export const getProfileModel = createSelector(
  getProfileState,
  state => state.model
);

export const getProfileLoading = createSelector(
  getProfileState,
  state => state.loading
);

export const getProfileError = createSelector(
  getProfileState,
  state => state.error
);


export const getProfileVM = createSelector(
  getProfileState,
  (state, auth) => {
    return {...state, auth}
  }
);