import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { InterfaceService } from 'src/interfaces.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-ngx-modal',
  templateUrl: './ngx-modal.component.html',
  styleUrls: ['./ngx-modal.component.css']
})
export class NgxModalComponent implements OnInit {

  @Input() myInput: string;
  @Input() nodesInfo: JSON;
  @Input() name: string;
  nodesinterfaces: Object;
  selectedrowid : string;
  rectelement : HTMLElement;

  constructor(private modalService: NgxSmartModalService,
              private interfaceService: InterfaceService) {
                interfaceService.getInterfacesData().subscribe( data => this.nodesinterfaces = data);
               }

  ngOnInit() {
    console.log('p')
    console.log(this.myInput);
  }

  closeModal() {          //for closing the modal.
    this.modalService.closeLatestModal();
  }

  highlightRow(event) {                               // It is called to highlight the table row in modal
    (event.target as SVGRectElement ).style.stroke = '#ccc';        //when hovered over the interface.
    (event.target as SVGRectElement ).style.strokeWidth = '3';
    console.log(event.target);
    this.selectedrowid = 'id' + event.target.id;
    console.log(this.selectedrowid);
    const element = document.getElementById(this.selectedrowid);
    element.style.backgroundColor = 'rgb(129, 173, 255)';
    element.scrollIntoView();
  }

  unHighlightRow(event) {                 //remove the highlight from the table row when not hovering on the interface.
    (event.target as SVGRectElement ).style.stroke = '';
    (event.target as SVGRectElement ).style.strokeWidth = '';
    console.log(event.target);
    console.log(this.selectedrowid);
    const element2 = document.getElementById(this.selectedrowid);
    element2.style.backgroundColor = '';
  }

  highlightInterface(index: string) {   //On hovering over the table row, the interface is highlighted.
    this.rectelement = document.getElementById(index);
    this.rectelement.style.stroke = 'grey';
    this.rectelement.style.strokeWidth = '3';
  }

  unHighlightInterface() {            //remove highlight when the pointer is not hovering over the table row. 
    this.rectelement.style.stroke = '';
    this.rectelement.style.strokeWidth = '';
  }
}











  //To highlight the table row when the mouse pointer is hovered over it.
//   public highlightRow(item){

//     this.selectedName = item.coords;
    
//     console.log(item);
//     console.log(item.coords.x);
//     console.log(item.coords.y);

//     this.svgnodes(item);          //svgnodes() is called to highlight the interface node in modal,
//                                   // corresponding to the respective table row highlighted.

//   }

//   public removeHighlightRow(){          //To remove the highlight property from the table row when the,
//                                         //mouse pointer is removed from it or does not hover over it.
//     this.selectedName = false;

//   }

//   svgnodes(item){
//     var svgContainer = d3.select("#modalsvg")     

//     console.log(item.status);             //svgnodes() is called to highlight the interface node in modal,
//                                           //corresponding to the respective table row highlighted.
//     if(item.status == "online"){

//       console.log("onlinetrue")

//       var rectangle = svgContainer.append("rect")
//       .attr("x", item.coords.x)
//       .attr("y", item.coords.y)            //if the interface is online,it turns green on hovering,
//       .attr("width", item.coords.w)        //over the table row.
//       .attr("height", item.coords.h)
//       .style("fill","green")

//     }

//     if(item.status == "offline"){

//       console.log("offlinefalse")

//       var rectangle = svgContainer.append("rect")
//       .attr("x", item.coords.x)
//       .attr("y", item.coords.y)                //if the interface is offline,it turns red on hovering,
//       .attr("width", item.coords.w)            //over the table row.
//       .attr("height", item.coords.h)
//       .style("fill","red")
//     }
//     if(item.status == "testing")
//     {

//       console.log("testing")

//       var rectangle = svgContainer.append("rect")
//       .attr("x", item.coords.x)
//       .attr("y", item.coords.y)                //if the interface is testing,it turns orange on hovering,
//       .attr("width", item.coords.w)            //over the table row.
//       .attr("height", item.coords.h)
//       .style("fill","orange")
//     } 

//   }

// reverseEffectInterface(item){                         //to remove the highlight from the interface node when the,
//                                               //mouse pointer stops hovering over the table row.
//   var svgContainer = d3.select("#modalsvg")
//   var rectangle = svgContainer.append("rect")
//                               .attr("x", item.x)
//                               .attr("y", item.y)
//                               .attr("width", item.w)
//                               .attr("height", item.h)
//                               .style("fill","rgb(0, 45, 128)")

// }

//   public removeHighlight(item){          //to remove highlight from the table row as well as the interface node.
//     this.reverseEffectInterface(item);
//     this.removeHighlightRow();
//   }

  
  

// }