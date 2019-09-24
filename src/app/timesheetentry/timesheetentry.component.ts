import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheetEntryService } from '../services/timsheet.entry.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-timesheetentry',
  templateUrl: './timesheetentry.component.html',
  styleUrls: ['./timesheetentry.component.scss']
})

export class TimesheetentryComponent implements OnInit {

  Tasks: any;
  employees: any;
  selectedEmployee: any;
  TimeSheetEntries: any;
  dummy: any;
  employeeName: any;
  currentWeek: any = 0;
  heading: string;
  currentEmployeeId: any;

  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private timeSheetEntryService: TimeSheetEntryService,

    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrManager) {
  }

  ngOnInit() {
    this.currentEmployeeId = this.route.snapshot.params['id'];
    this.getData(0, this.currentEmployeeId);
  }

  // This is called on submitting timesheet enteries
  onSubmit() {

    for (let i = 0; i < this.TimeSheetEntries.length; i++) {
      this.TimeSheetEntries[i].employeeId = this.selectedEmployee;
    }

    this.timeSheetEntryService.addTimeSheetEntry(this.TimeSheetEntries)
      .subscribe(
        data => {
          this.showTimeSheetEntrySuccess();
        },
        error => {
          this.showError();
        });
  }

  // Send request to Web Api service to fetch Tasks, Employees and existing TimeSheet enteries for given Week No and EmployeeId
  getData(weekNo: any, currentEmployeeId: any) {
    let employeePromise = this.employeeService.getallemployees();
    let taskPromise = this.taskService.getAllTasks();
    let timeSheetEntriesPromise = this.timeSheetEntryService.getAllTimeSheetEnteriesByEmpId(currentEmployeeId, weekNo);

    forkJoin([employeePromise, taskPromise, timeSheetEntriesPromise]).subscribe(result => {

      this.employees = result[0];
      this.selectedEmployee = this.employees.find(employee => employee.id == currentEmployeeId).id;
      this.Tasks = result[1];
      this.TimeSheetEntries = result[2];

      if (this.TimeSheetEntries.length == 0) {
        this.addNewTimeSheetEntry();
        this.showWarning();
        this.heading = "Weekly " + this.currentWeek;
      }
      else {
        this.employeeName = this.employees.filter(entry => entry.id == this.route.snapshot.params['id']);
        this.showSuccess(this.employeeName.map(empName => empName.name));

        this.currentWeek = this.TimeSheetEntries[0].weekNo;
        this.heading = "Weekly " + this.currentWeek;

      }
    });
  }

  // Go back to timesheet list page
  backToList() {
    this.router.navigateByUrl('/');
  }

  // Navigate to next Week timesheet enteries page
  next() {
    this.getData(this.currentWeek + 1, this.currentEmployeeId);
    this.currentWeek = this.currentWeek + 1;
    this.heading = "Weekly " + this.currentWeek;
  }

  // Navigate to previous Week timesheet enteries page
  previous() {
    if (this.currentWeek === 0) {
      this.showPreviousWarning();
    }
    else {
      this.getData(this.currentWeek - 1, this.currentEmployeeId);
      this.currentWeek = this.currentWeek - 1;
      this.heading = "Weekly " + this.currentWeek;
    }
  }

  // This event fired on employee selection change from drop down
  onChange(e) {
    this.currentEmployeeId = this.selectedEmployee;
    this.getData(this.currentWeek, this.currentEmployeeId);
  }

  // Show success notification
  showSuccess(name: any) {
    this.toastr.successToastr('Employee weekly timesheet has been retrieved for employee: ' + name, 'Success!');
  }

  // Show timesheet entry creation success notification
  showTimeSheetEntrySuccess() {
    this.toastr.successToastr('A timesheet entry has been successfully updated.', 'Success!');
  }

  // Show error notification
  showError() {
    this.toastr.errorToastr('Something went wrong.', 'Error!');
  }

  // Show warning notification
  showWarning() {
    this.toastr.warningToastr('You have not added timesheet for this Week.', 'Warning!');
  }

  // Show notification if previous week clicked but user is already on Week 0
  showPreviousWarning() {
    this.toastr.warningToastr('You are already on first week.', 'Warning!');
  }

  // Add default blank timesheet entry to TimeSheetEnteries array
  addNewTimeSheetEntry() {
    this.TimeSheetEntries.push(
      {
        "taskId": 0,
        "weekNo": this.currentWeek,
        breakdownByTask: [
          {
            "dayNo": 0
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 1
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 2
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 3
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 4
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 5
            , "employeeId": this.route.snapshot.params['id']
          }, {
            "dayNo": 6
            , "employeeId": this.route.snapshot.params['id']
          }
        ]
      });
  }
}
