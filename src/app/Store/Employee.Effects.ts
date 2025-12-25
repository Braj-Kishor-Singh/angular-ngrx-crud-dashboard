import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../services/employee.service";
import { loadEmployee, loadEmployeeSuccess, loadEmployeeFailure, deleteEmployee, deleteEmployeeSuccess, emptyAction, addEmployee, addEmployeeSuccess, updateEmployee, updateEmployeeSuccess } from "./Employee.Action";
import { exhaustMap, map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";


@Injectable()

export class EmpEffect {
    // constructor(private actions$: Actions, private _employeeService: EmployeeService) { }
    private actions$ = inject(Actions);
    private _employeeService = inject(EmployeeService);
    public _toastr = inject(ToastrService);

    _loadEmployee = createEffect(() =>
        this.actions$.pipe(ofType(loadEmployee), exhaustMap((action) => {
            return this._employeeService.GetAll() // API call to get all employee 
            .pipe(
                map((data) => {
                    return loadEmployeeSuccess({ list: data })
                }),
                catchError((err) => of(
                    loadEmployeeFailure({ errMsg: err })
                ))
            )
        }

        )
        )
    )

    _deleteEmployee = createEffect(() =>
        this.actions$.pipe(ofType(deleteEmployee), switchMap((action) => {
            return this._employeeService.Delete(action.empId) // API call to delete an employee
            .pipe(
                switchMap((data) => {
                    return of(deleteEmployeeSuccess({ empId: action.empId }),
                        this.ShowAlert('Deleted Successfully.', 'pass')
                    )
                }),
                catchError((err) => of(
                    this.ShowAlert(err.message, 'fail')
                ))
            )
        }

        )
        )
    )

    _addEmployee = createEffect(() =>
        this.actions$.pipe(ofType(addEmployee), switchMap((action) => {
            return this._employeeService.Create(action.data) // API call to create an employee
            .pipe(
                switchMap((data) => {
                    return of(addEmployeeSuccess({ data: action.data }),
                        this.ShowAlert('Created Successfully.', 'pass')
                    )
                }),
                catchError((err) => of(
                    this.ShowAlert(err.message, 'fail')
                ))
            )
        }

        )
        )
    )

    _updateEmployee = createEffect(() =>
        this.actions$.pipe(ofType(updateEmployee), switchMap((action) => {
            return this._employeeService.Update(action.data) // API call to update an employee
            .pipe(
                switchMap((data) => {
                    return of(updateEmployeeSuccess({ data: action.data }),
                        this.ShowAlert('Updated Successfully.', 'pass')
                    )
                }),
                catchError((err) => of(
                    this.ShowAlert(err.message, 'fail')
                ))
            )
        }

        )
        )
    )

    ShowAlert(message: string, responce: string) {
        if (responce === 'pass') {
            this._toastr.success(message);
        } else {
            this._toastr.error(message);
        }
        return emptyAction()
    }

}