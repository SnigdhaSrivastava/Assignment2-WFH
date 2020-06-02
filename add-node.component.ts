import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddnodeService } from 'src/app/addnode.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {

  title = 'addNode';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private addnodeService: AddnodeService) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        status: ['', [Validators.required]],
        ip: ['', [Validators.required]],
        nodename: ['', [Validators.required]],
        xcoord: ['', [Validators.required]],
        ycoord: ['', [Validators.required]]
    });
}
// convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

onSubmit() {
   const ipval = this.f.ip.value ;
   const nodenameval = this.f.nodename.value;
   const statusval = this.f.status.value;
   const xcoordval = this.f.xcoord.value;
   const ycoordval = this.f.ycoord.value;

   var formData = new FormData();

// Display the values

     formData.append("name", nodenameval);
     formData.append("status", statusval);
     formData.append("ip", ipval);
     formData.append("xcoord", xcoordval);
     formData.append("ycoord", ycoordval);

     for (var value of formData.values()) {
      console.log(value); 
   }

   this.addnodeService.sendData(formData).subscribe(        //service to post addnode data in the backend
     (response) => console.log(response),
     (error) => console.log(error)
   );

    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
    window.location.reload();
   
}
}
