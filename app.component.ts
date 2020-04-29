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
      console.log(this.serverData[0][2]);

      this.svgnodes();

      
    })
  }


  //function to create nodes using svg and d3
  svgnodes() {
    
    //creating the svg container
    var svgContainer = d3.select("body").append("svg")
                                     .attr("width", 1000)
                                     .attr("height", 600)
                                     .style("border", "1px solid black");


    //creating nodes
    for (let i = 0; i < this.count; i++){

      console.log(i);
      let j=0;
      
      console.log(i,j);

      var rectangle = svgContainer.append("rect")
      .attr("x", this.serverData[i][j])
      .attr("y", this.serverData[i][j+1])
      .attr("width", 50)
      .attr("height", 50)
      .style("fill","green")
      .append("svg:title")             //tooltip hovering
      .text(this.serverData[i][2]);

                                      
     }
  }
}
