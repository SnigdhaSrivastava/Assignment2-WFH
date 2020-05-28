import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient:HttpClient) { }

  public get() {
    return this.httpClient.get("http://127.0.0.1:8080/");
  }
}
