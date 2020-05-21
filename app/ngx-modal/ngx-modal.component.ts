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
  public selectedName : any;

  constructor(private modalService: NgxSmartModalService,
              private interfaceService: InterfaceService) {
                interfaceService.getInterfacesData().subscribe( data => this.nodesinterfaces = data);
               }

  ngOnInit() {
    console.log('p')
    console.log(this.myInput);
  }

  closeModal() {
    this.modalService.closeLatestModal();
  }

  
  public highlightRow(item){

    this.selectedName = item.coords;
    
    console.log(item);
    console.log(item.coords.x);
    console.log(item.coords.y);

    this.svgnodes(item);

  }

  public removeHighlightRow(){
    this.selectedName = false;

  }

  svgnodes(item){
    var svgContainer = d3.select("#modalsvg")

    console.log(item.status);
    if(item.status == "online"){

      console.log("onlinetrue")

      var rectangle = svgContainer.append("rect")
      .attr("x", item.coords.x)
      .attr("y", item.coords.y)
      .attr("width", item.coords.w)
      .attr("height", item.coords.h)
      .style("fill","green")

    }
    if(item.status == "offline"){

      console.log("offlinefalse")

      var rectangle = svgContainer.append("rect")
      .attr("x", item.coords.x)
      .attr("y", item.coords.y)
      .attr("width", item.coords.w)
      .attr("height", item.coords.h)
      .style("fill","red")
    }
    if(item.status == "testing")
    {

      console.log("testing")

      var rectangle = svgContainer.append("rect")
      .attr("x", item.coords.x)
      .attr("y", item.coords.y)
      .attr("width", item.coords.w)
      .attr("height", item.coords.h)
      .style("fill","orange")


    }
    
                                      

    

  }

reverseEffect(item){

  var svgContainer = d3.select("#modalsvg")
  var rectangle = svgContainer.append("rect")
                              .attr("x", item.x)
                              .attr("y", item.y)
                              .attr("width", item.w)
                              .attr("height", item.h)
                              .style("fill","rgb(0, 45, 128)")

}

  public removeHighlight(item){
    this.reverseEffect(item);
    this.removeHighlightRow();
  }
  

}