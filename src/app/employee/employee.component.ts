import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'employee-list',
    templateUrl: 'employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class EmployeeListComponent implements OnInit {
    employees: any;
    constructor(
        private employeeService: EmployeeService,
        private router: Router,
        public toastr: ToastrManager) { }

    ngOnInit() {
        this.employeeService.getallemployees().subscribe(data => {
            this.employees = data;
            this.showSuccess();
        });
    }

    showSuccess() {
        this.toastr.successToastr('Employee(s) data has been retrieved.', 'Success!');
      }

    NavigateToTimeSheetEntry(selectedEmployee: any) {
        this.router.navigateByUrl('/timesheetentry/' + selectedEmployee.id);
    }
}