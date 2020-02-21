import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';
import { UserMerch } from '../models/user-merch';
import { UsermerchService } from '../services/usermerch.service';

@Component({
  selector: 'app-manage-merch',
  templateUrl: './manage-merch.component.html',
  styleUrls: ['./manage-merch.component.css']
})
export class ManageMerchComponent implements OnInit 
{
  toAdd : boolean = false;
  user : User;
  addedMerch : UserMerch = new UserMerch();
  url = '';
  avatarImage: any = "https://www.w3schools.com/w3images/avatar2.png";

  constructor(
    public userApi : UserApiService,
    public merchApi : UsermerchService,
  ) { }

  ngOnInit() {
    this.user = this.userApi.getLoggedInUser();
    this.addedMerch.user = this.user.id_user;
  }

  changeState()
  {
    this.toAdd = true;
  }
  
  onStartChangingMerchImage(event)
  {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
      console.log(event.target.result);
        this.url = event.target.result;
      }
    }
  }

  addUserMerch(image)
  {
    let file : File = image.files.item(0);
    this.merchApi.addNewUserMerch(this.addedMerch).subscribe(response => {
      let newID = response;
      let formData: FormData = new FormData();
      formData.append('file', file, newID+'.jpg');
      this.merchApi.uploadMerchPicture(formData).subscribe(resp2 => {
        location.reload();
      });
    })
  }

}
