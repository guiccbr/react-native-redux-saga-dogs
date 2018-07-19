// @flow

import { ApiCalls, ImgStatus } from '../actions';
import type { DogSagaAppState } from '../../components/DogSagaApp';

const initialState: DogSagaAppState = {
  fetching: false,
  dog: null,
  error: null,
  imgLoading: true,
};

type Action = {
  +type: string,
  dog: any,
  error: any,
};

export function reducer(state: DogSagaAppState = initialState, action: Action) {
  switch (action.type) {
    case ApiCalls.API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, imgLoading: true };
    case ApiCalls.API_CALL_SUCCESS:
      // TODO: Check if error: null is really required. It seems so.
      return { ...state, fetching: false, dog: action.dog, error: null };
    case ApiCalls.API_CALL_FAILURE:
      return { ...state, fetching: false, dog: null, error: action.error };
    case ImgStatus.IMG_LOADED:
      return { ...state, imgLoading: false };
    default:
      return state;
  }
}
