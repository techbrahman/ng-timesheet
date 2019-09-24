import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {
    private baseapi = environment.baseUrl;
    constructor(private http: HttpClient) { }

    // Get all tasks
    getAllTasks() {
        return this.http.get(this.baseapi + "/Task");
    }
}