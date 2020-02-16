import { Component, OnInit } from '@angular/core';
import { ForumServicesService } from '../services/forum-services.service';
import { ForumCategories } from '../models/forum-categories';
import { Subreddits } from '../models/subreddits';
@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {
  listcat=[];
  constructor(
    public fser:ForumServicesService
  ) { }

  ngOnInit() {
  this.getallcategories();

  }
public getallcategories()
{

  this.fser.listcategories().subscribe(response => {
  
    response.forEach(element => {


    let cate = new ForumCategories();
   cate.id = element._id;
   cate.name = element.NameCategory;
   
   element.reddiDetails.forEach(z => {
     let sub=new Subreddits();
   sub.id = z._id;
   sub.addtime = z.added;
   sub.Topicname = z.TopicName
   sub.description = z.Description;
   sub.category = cate
   cate.subreddits.push(sub);
  
   });
     this.listcat.push(cate);
    
    });
    console.log(this.listcat);
  });
  
}
}
