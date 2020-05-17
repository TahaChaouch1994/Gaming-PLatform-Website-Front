import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit 
{
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  eventHandler(event, closebutton) {
    //console.log(event, event.keyCode, event.keyIdentifier);
    if (event.key === "Enter")
    {
      console.log(event.target.value);
      this.router.navigate(['/search'], { queryParams: { criteria: event.target.value } })
      closebutton.click();
    }
 } 
}

