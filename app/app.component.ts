import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { InterfaceService } from 'src/interfaces.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalName: string = "popuptwo";
  nodesDetails: Object = [
    {
      name: "nodes_1",
      status: "online",
      ip: "1.1.1.1"
    },
    {
      name: "nodes_2",
      status: "offline",
      ip: "1.1.1.2"
      }
  ]
  @ViewChildren('items') items: QueryList<ElementRef>; 
  title = 'network-nodes';
  nodes: JSON;
  nodedetails: JSON;
  constructor (
    public ngxSmartModalService: NgxSmartModalService,
    private httpClient: HttpClient, 
    private nodeinterfaces: InterfaceService) {
      nodeinterfaces.getInterfacesData().subscribe( data => this.nodedetails = data as JSON);
    }

  ngOnInit(){
    this.httpClient.get('http://127.0.0.1:8080/').subscribe(
      (data: JSON) => {
        this.nodes = data;
        console.log(this.nodes);
        console.log(this.nodes[2][2]);
      } 
    )
  }
  
  onCLick(item: string) {
    console.log(item);
    
    this.ngxSmartModalService.getModal(item).open();
    this.ngxSmartModalService.setModalData(this.nodes, item);
  }
  
}




  //function to create nodes using svg and d3
//   svgnodes() {
    
//     //creating the svg container
//     var svgContainer = d3.select("body").append("svg")
//                                      .attr("width", 1000)
//                                      .attr("height", 600)
//                                      .style("border", "1px solid black");


//     //creating nodes
//     for (let i = 0; i < this.count; i++){

//       console.log(i);
//       let j=0;
      
//       console.log(i,j);

//       var rectangle = svgContainer.append("rect")
//       .attr("x", this.serverData[i][j])
//       .attr("y", this.serverData[i][j+1])
//       .attr("width", 50)
//       .attr("height", 50)
//       .style("fill","green")
//       .append("svg:title")             //tooltip hovering
//       .text(this.serverData[i][2]);

                                      
//      }
//   }
// }
