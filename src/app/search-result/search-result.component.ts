import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchCritera = "";
  searchList = "";

  constructor(
    private route: ActivatedRoute,
    private userApi: UserApiService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchCritera = params['criteria'];
      this.userApi.searchForUsers(this.searchCritera).subscribe(response => {
        this.searchList = response;
      })
    });
  }

}
