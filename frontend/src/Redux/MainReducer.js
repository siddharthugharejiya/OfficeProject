import { combineReducers } from "redux";
import { Product_Edite_get_reducer, Product_Get_reducer } from "./Reducer";


export const MainReducer = combineReducers({
      Product : Product_Get_reducer,
      Product_edite_getting : Product_Edite_get_reducer
})