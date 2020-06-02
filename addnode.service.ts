import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddnodeService{

  constructor(private httpClient:HttpClient) { }

  public sendData(formData) {
    return this.httpClient.post<any>("http://127.0.0.1:8080/addnode",formData);
  }
}
