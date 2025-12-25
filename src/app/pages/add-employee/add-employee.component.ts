import { Component, Inject, Signal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';

import { IEmployee } from '../../model/employee.model';
import { Store } from '@ngrx/store';



import {
  addEmployee,
  getEmployee,
  updateEmployee
} from '../../Store/Employee.Action';
import { selectEmployee } from '../../Store/Employee.Selector';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  providers: [
    provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  readonly isEdit = signal<boolean>(false);
  readonly title = signal<string>('Add Employee');

  roles = [
    { value: '', label: 'Please select role' },
    { value: 'manager', label: 'Manager' },
    { value: 'lead', label: 'Lead' },
    { value: 'operator', label: 'Operator' }
  ];

  readonly empFormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required)
  });
  selectedEmployee!: Signal<IEmployee | null>
  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { code?: number }
  ) {
    this.selectedEmployee = toSignal(
      this.store.select(selectEmployee),
      { initialValue: null }
    );

    if (data?.code && data.code > 0) {
      this.isEdit.set(true);
      this.title.set('Edit Employee');
      this.store.dispatch(getEmployee({ empId: data.code }));
    }

    effect(() => {
      const emp = this.selectedEmployee();

      if (emp && this.isEdit()) {
        this.empFormGroup.patchValue(emp);
      }
    });
  }

  SaveEmployee() {
    if (this.empFormGroup.valid) {
      let _data: IEmployee = {
        id: this.empFormGroup.value.id as number,
        name: this.empFormGroup.value.name as string,
        doj: new Date(this.empFormGroup.value.doj as Date),
        role: this.empFormGroup.value.role as string,
        salary: this.empFormGroup.value.salary as number,
      }

      if (this.isEdit()) {
        this.store.dispatch(updateEmployee({ data: _data }));
      } else {
        this.store.dispatch(addEmployee({ data: _data }));
      }

      this.closepopup();
    }
  }

  closepopup() {
    this.dialogRef.close();
  }
}
