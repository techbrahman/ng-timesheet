import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { TimesheetentryComponent } from './timesheetentry/timesheetentry.component';
import { RouterModule } from '@angular/router';
import { TaskService } from './services/task.service';
import { TimeSheetEntryService } from './services/timsheet.entry.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    TimesheetentryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    // Register router model with routes defined
    RouterModule.forRoot([
      { path: '', component: EmployeeListComponent },
      { path: 'timesheetentry/:id', component: TimesheetentryComponent }

    ]),

    // Below modules are needed for showing toastr notifications
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    EmployeeService,
    TaskService,
    TimeSheetEntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
