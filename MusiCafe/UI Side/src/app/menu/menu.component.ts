import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { PopUpsComponent } from '../pop-ups/pop-ups.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items = []
  selected_item:any;
  constructor(private menuService:MenuService,
    public dialogRef:MatDialog) { };

  ngOnInit() {
    this.pass_data('Coffee')
  }

  pass_data(data)
  {
    this.items = [];
    this.selected_item = data;
    this.menuService.get_items_details(this.selected_item).subscribe(data=>{
      this.items = data['items'][0]['Categories']['items']
      console.log(this.items)
    })
  }
  
  pop_data(data,item){
    let section = data;
    let popUpWidth = "";
    let popUpHeight = ""
    let popUpData = [section,item]
    if(section == 'edit-item'){
      popUpWidth = "210px";
      popUpHeight = "510px";
    }
    else if(section == 'delete-item'){
      popUpWidth = "400px";
      popUpHeight = "150px";
    }
    else{
      popUpWidth = "750px";
      popUpHeight = "450px";
    }
    
    const dialog = this.dialogRef.open(PopUpsComponent, {
      width: popUpWidth,
      height: popUpHeight,
      data:{ comp:popUpData},
      disableClose: true,
    });

    dialog.afterClosed().subscribe((result) => {
    });
   
  }
}