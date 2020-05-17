import { Component, OnInit } from '@angular/core';
import { ForumServicesService } from '../services/forum-services.service';
import { ForumCategories } from '../models/forum-categories';
import { Subreddits } from '../models/subreddits';
import {Router} from "@angular/router"
import { Subrview } from '../models/subrview';
import { Thread } from '../models/thread';
@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {
  listcat=[];
  listthr=[];
  nbz=0;
  constructor(
    private router : Router,
  
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
     let sub=new Subrview();
   sub.id = z._id;
  this.fser.getallThreadsfromid(z._id).subscribe(respz=>{
    this.listthr.push(respz);
    this.nbz ++ ;
    
   this.listthr = respz
   
   
   sub.lastthread =this.listthr[this.listthr.length]
   
  
   sub.threadsnumber = this.listthr.length
 })
 ;
   sub.addtime = z.added;
   sub.Topicname = z.TopicName
   sub.description = z.Description;
   sub.category = cate
   
   cate.subreddits.push(sub);
  
  
   });
     this.listcat.push(cate);
    
    });
   
  });
 
}

test(subs)
{
  this.router.navigate([ "/ThreadList" ,{id : subs.id}]);

}

gotothreadsdetail(item)
  {
    this.router.navigate([ "/ThreadDetails" ,{id : item["_id"]}]);
    console.log("tttttttttttttttt")
    console.log(item)

  }
}
