import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class TimeSheetEntryService {

    private baseapi = environment.baseUrl;
    constructor(private http: HttpClient) { }

    // Get all timesheet enteries by employee id and week no
    getAllTimeSheetEnteriesByEmpId(employeeId: any, weekNo: any) {
        return this.http.get(this.baseapi + "/TimeSheetEntry/GetAllByEmployeeId/" + employeeId + "/" + weekNo);
    }

    // Submit timesheet enteries to the server (Web Api)
    addTimeSheetEntry(timeSheetEntry: any) {
        let timeSheetEntryString: String = JSON.stringify(timeSheetEntry);
        return this.http.post(this.baseapi + "/TimeSheetEntry", timeSheetEntryString, httpOptions);
    }
}