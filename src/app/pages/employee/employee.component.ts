import { Component, OnInit, AfterViewInit, ViewChild, effect, signal, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { IEmployee } from '../../model/employee.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadEmployee, deleteEmployee } from '../../Store/Employee.Action';
import { getEmpList } from '../../Store/Employee.Selector';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-employee',
  // providers: [AddEmployeeComponent],
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule, MatPaginatorModule, CommonModule, MatSortModule, MatIconModule, MatTooltipModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'role', 'doj', 'salary', 'action'];
  dataSource = new MatTableDataSource<IEmployee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  empListSignal!: Signal<IEmployee[]>;


  constructor(private dialog: MatDialog, private store: Store) {
    this.empListSignal = toSignal(this.store.select(getEmpList), { initialValue: [] });
    // effect(() => {
    //   this.dataSource.data = this.empListSignal();
    // });
  }

  // ✅ Effect in injection context
  readonly syncTableEffect = effect(() => {
    this.dataSource.data = this.empListSignal();
  });

  ngOnInit(): void {
    this.store.dispatch(loadEmployee());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEmployee() {
    this.openpopup(0);
  }
  editEmployee(EmpId: number) {
    this.openpopup(EmpId);
  }
  deleteEmployee(EmpId: number) {
    if (confirm('Are you sure? ')) {
      this.store.dispatch(deleteEmployee({ empId: EmpId }));
    }
  }
  openpopup(empId: number) {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': empId
      }
    })
  }

}
