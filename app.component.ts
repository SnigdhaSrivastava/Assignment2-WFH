import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assig2';
  serverData : JSON;
  count=0;
  
 
  

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('http://127.0.0.1:8080/').subscribe(data => {
      this.serverData = data as JSON;
      
      this.count = Object.keys(this.serverData).length;        //counting the number of nodes (total number of array(x,y coordinates))
      console.log(this.count);
      

      console.log("Success");
      console.log(this.serverData);
      console.log(this.serverData[0]);
      console.log(this.serverData[0][1]);

      this.svgnodes();

      
    })
  }

  svgnodes() {

    var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 500)
                                     .attr("height", 500);
 
 //Draw the Rectangle
      var rectangle = svgContainer.append("rect")
                              .attr("x", this.serverData[0][0])
                              .attr("y", this.serverData[0][1])
                              .attr("width", 50)
                              .attr("height", 50)
                              .style("fill","green");
                              

  }



}
