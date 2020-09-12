import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items = []
  selected_item:any;
  constructor(private menuService:MenuService) { };

  ngOnInit() {
    this.pass_data('Coffee')
  }

  pass_data(data)
  {
    this.items = [];
    this.selected_item = data;
    this.menuService.get_items_details(this.selected_item).subscribe(data=>{
      this.items = data['items'][0]['Categories']['items']
    })
  }

  edit() {
    this.selected_item = "do_edit";
    console.log("rjk");
  }
}

  




