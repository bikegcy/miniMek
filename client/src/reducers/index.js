import { combineReducers } from 'redux';
import heroReducer from './heroReducer';
import mechReducer from './mechReducer';
import unitReducer from "./unitReducer";

export default combineReducers({
  hero: heroReducer,
  mech: mechReducer,
  unit: unitReducer
});
