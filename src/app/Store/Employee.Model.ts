import { IEmployee } from "../model/employee.model";

export interface IEmployeeModel {
    list: IEmployee[],
    errormessage: string,
    empObj: IEmployee
}