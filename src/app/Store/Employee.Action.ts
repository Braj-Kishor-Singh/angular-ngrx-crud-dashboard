import { createAction, props } from "@ngrx/store";
import { IEmployee } from "../model/employee.model";

// GET ALL EMPLOYEE

export const LOAD_EMPLOYEE = "[employee] getall";
export const LOAD_EMPLOYEE_SUCCESS = "getall employee success";
export const LOAD_EMPLOYEE_FAILURE = "getall employee failure";

export const loadEmployee = createAction(LOAD_EMPLOYEE)
export const loadEmployeeSuccess = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: IEmployee[] }>())
export const loadEmployeeFailure = createAction(LOAD_EMPLOYEE_FAILURE, props<{ errMsg: string }>())

// ADD EMPLOYEE

export const ADD_EMPLOYEE = "[employee] add";
export const ADD_EMPLOYEE_SUCCESS = "[employee] add success";

export const addEmployee = createAction(ADD_EMPLOYEE, props<{ data: IEmployee }>())
export const addEmployeeSuccess = createAction(ADD_EMPLOYEE_SUCCESS, props<{ data: IEmployee }>())

// UPDATE EMPLOYEE

export const UPDATE_EMPLOYEE = "[employee] update";
export const UPDATE_EMPLOYEE_SUCCESS = "[employee] update success";

export const updateEmployee = createAction(UPDATE_EMPLOYEE, props<{ data: IEmployee }>())
export const updateEmployeeSuccess = createAction(UPDATE_EMPLOYEE_SUCCESS, props<{ data: IEmployee }>())


// DELETE EMPLOYEE

export const DELETE_EMPLOYEE = "[employee] delete";
export const DELETE_EMPLOYEE_SUCCESS = "[employee] delete success";

export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{ empId: number }>())
export const deleteEmployeeSuccess = createAction(DELETE_EMPLOYEE_SUCCESS, props<{ empId: number }>())


// GET ONE EMPLOYEE

export const GET_EMPLOYEE = "get employee";
export const getEmployee = createAction(GET_EMPLOYEE, props<{ empId: number }>())




// EXTERA AACTIONS
export const emptyAction = createAction('empty');