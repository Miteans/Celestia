import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { PopUpsComponent } from '../pop-ups/pop-ups.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items = []
  selected_item:any;
  constructor(private menuService:MenuService,
    public dialogRef:MatDialog,
    private sanitizer: DomSanitizer) { 
    };

  ngOnInit() {
    this.pass_data('Coffee')
  }

  pass_data(data)
  {
    this.items = [];
    this.selected_item = data;
    this.menuService.get_items_details(this.selected_item).subscribe(data=>{
      console.log(data)
      this.items = data['items'][0]['Categories']['items']
    })
    
  }
  
  pop_data(data,item){
    let section = data;
    let popUpWidth = "";
    let popUpHeight = ""
    let popUpData = [section,this.selected_item,item]
    if(section == 'edit-item'){
      popUpWidth = "720px";
      popUpHeight = "450px";
    }
    else if(section == 'delete-item'){
      popUpWidth = "600px";
      popUpHeight = "140px";
    }
    else{
      popUpWidth = "730px";
      popUpHeight = "410px";
    }
    
    const popUp = this.dialogRef.open(PopUpsComponent, {
      width: popUpWidth,
      height: popUpHeight,
      data:{ comp:popUpData},
      disableClose: true,
    });
   popUp.afterClosed().subscribe((result) => {
      this.pass_data(this.selected_item);
    });
  }
}