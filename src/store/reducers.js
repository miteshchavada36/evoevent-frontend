import { combineReducers } from 'redux';
import authUserReducer from './slices/authUser/authUserSlice';
import sidebarCounterReducer from './slices/sideBar/sidebarCounterSlice';
import sidebarReducer from './slices/sideBar/sidebarSlice';
export default combineReducers({
  authUserReducer,
  sidebarCounterReducer,
  sidebarReducer
});