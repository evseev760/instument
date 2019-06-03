import { combineReducers } from 'redux'
import basket from './basket';
import login from './login';
import fltrBtn from './fltrBtn';
import catalogID from './catalogID';
import getCategoriesInfo from './getCategoriesInfo';
import page from './page';
import sort from './sort';
import typeID from './typeID';
import search from './search';


export default combineReducers({
  fltrBtn,
  basket,
  login,
  catalogID,
  getCategoriesInfo,
  sort,
  page,
  typeID,
  search
  
})