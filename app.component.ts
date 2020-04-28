import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assig2';
  serverData : JSON;

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('http://127.0.0.1:8080/').subscribe(data => {
      this.serverData = data as JSON;
      console.log("Success");
      console.log(this.serverData);
    })
  }

}
