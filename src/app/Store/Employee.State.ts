import { IEmployeeModel } from "./Employee.Model";

export const employeeState: IEmployeeModel = {
    list: [],
    errormessage: "",
    empObj: {
        id: 0,
        name: "",
        doj: new Date(),
        role: "",
        salary: 0
    }
}