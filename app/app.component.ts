import { Component, ElementRef, ViewChildren, QueryList,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { InterfaceService } from 'src/interfaces.service';
import { BackendService } from 'src/app/backend.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  modalName: string = "popuptwo";
  
  @ViewChildren('items') items: QueryList<ElementRef>; 
  title = 'network-nodes';
  nodes: JSON;
  nodedetails: JSON;

  data=[];

  //noContext:any;

 // dataFromService = '';
  
  constructor (
    public ngxSmartModalService: NgxSmartModalService,
    private httpClient: HttpClient, 
    private nodeinterfaces: InterfaceService,
    private backendService: BackendService) {
      nodeinterfaces.getInterfacesData().subscribe( data => this.nodedetails = data as JSON);
    }

  ngOnInit(){
    this.backendService.get().subscribe((ret: any[])=>{    //backend service to fetch data from python to angular.
      console.log(ret);
      this.data = ret;
    })  
  }
  
  onCLick(item: string) {          //ngxSmartModal is used for making popup dialogue box which opens on ,
    console.log(item);             //clicking the node and contains the information about the node interfaces.
    
    this.ngxSmartModalService.getModal(item).open();
    this.ngxSmartModalService.setModalData(this.nodes, item);
  }

}

  //  WhichButton(event) {
  //   //console.log("whichbuttonevent");
  //   //console.log(event.which);
  //   switch(event.which){
      
  //     case 3:console.log("case 3 of switch");
      
  //            this.contextMenufunc();   //use contextmenu
  //            break;
  //   }    
  // }

  // contextMenufunc(){

  //   const noContext = document.getElementById('nocontextmenu');

  //    noContext.addEventListener('contextmenu', event => {
  //      event.preventDefault();
  //      event.stopPropagation();
  //      console.log("Prevent");
  //    });
    
  //    //this.dataFromService="data";

  //   console.log(noContext);
    
  //   console.log("right click")

  // }

















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
