import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IEmployeeModel } from "./Employee.Model";


const getEmployeeState = createFeatureSelector<IEmployeeModel>('emp');

export const getEmpList = createSelector(getEmployeeState,(state)=>{
    return state.list;
})

export const selectEmployee = createSelector(getEmployeeState,(state)=>{
    return state.empObj;
})