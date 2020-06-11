import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keybetmodal',
  templateUrl: './keybetmodal.component.html',
  styleUrls: ['./keybetmodal.component.css']
})
export class KeybetmodalComponent implements OnInit {

  constructor(
public matDialogRef : MatDialogRef<KeybetmodalComponent>

  ) { }

  ngOnInit() {
  }


  enterpublickey(it){
    if(it == "")
    {
      var drinkSelect = document.getElementById("keyprob");
      drinkSelect.hidden= false
    }
    else{
    this.matDialogRef.close(it)
  }
  }
}
