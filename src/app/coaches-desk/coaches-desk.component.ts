import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumServicesService } from '../services/forum-services.service';

@Component({
  selector: 'app-coaches-desk',
  templateUrl: './coaches-desk.component.html',
  styleUrls: ['./coaches-desk.component.css']
})
export class CoachesDeskComponent implements OnInit {

  constructor(

    private router : Router,
  
    public fser:ForumServicesService
  ) { 
    
  }

  ngOnInit() {
  }
  gotocoachdetails(){
    this.router.navigate([ "/coachDetail"]);


  }
}
