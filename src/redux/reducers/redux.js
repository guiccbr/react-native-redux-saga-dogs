import { ApiCalls, ImgStatus } from '../actions';

// The reducer has a initial state - following lines:
const initialState = {
  fetching: false, // Represents if we're currently fetching or not
  dog: null, // TODO: What's that?
  error: null, // TODO: What's that?
  imgLoading: true,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ApiCalls.API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, imgLoading: true};
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
