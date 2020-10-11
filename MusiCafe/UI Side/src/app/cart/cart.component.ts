import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  categories: any;
  items: any[];
  cart_items = [];
  grand_total = 0;
  dataSource: any;
  bill:boolean=false;
  displayedColumns: string[];
  dateFormat: string;
  selected_category: any;

  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    this.get_categories();
    this.dataSource = new MatTableDataSource(this.cart_items);
    this.displayedColumns = ['position','item_name','item_price', 'item_qty', 'tot_price', 'edit'];
  }

  onTabClick(event){
    this.selected_category = event['tab']['textLabel']
    this.pass_data(this.selected_category)
  }

  get_categories(){
    this.menuService.get_categories().subscribe(data=>{
      this.categories = data['categories']['categories']
    })
  }

  pass_data(data)
  {
    this.items = [];
    this.menuService.get_items_details(data).subscribe(data=>{
      this.items = data['items'][0]['Categories']['items']
    })
    
  }

  add_to_cart(item){
    let flag = false
    if(this.cart_items.length > 0)
    {
      this.cart_items.forEach(element=>{
        if(item['item_id'] == element['item_id']){
          element.item_qty = String(parseInt(element.item_qty) + 1)
          flag = true
        }
       
      })
    }   
    if(!flag){
      item.item_qty = 1
      item.category = this.selected_category
      this.cart_items.push(item)
    }  

    this.dataSource = new MatTableDataSource(this.cart_items);
    
  }

  remove_an_item(item){
    const index = this.cart_items.indexOf(item, 0);
    if (index > -1) {
       this.cart_items.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.cart_items);
  }

  calc_total(){
    this.grand_total = 0
    this.cart_items.forEach(element=>{
      this.grand_total += element.item_price * element.item_qty;
      
    })
    
  }

  cancel_order(){
    this.cart_items = []
    this.grand_total = 0
    console.log(this.cart_items)
    this.dataSource = new MatTableDataSource(this.cart_items);
  }

  set_order(){
    this.bill=true;
    console.log(this.cart_items)
    console.log(this.grand_total)
    let now = new Date();
    this.dateFormat = formatDate(now, 'dd-MM-yyyy hh:mm:ss a', 'en-IND', '+0530');
    console.log(this.dateFormat);
    this.menuService.add_cart_items(this.cart_items,this.grand_total,this.dateFormat).subscribe(data=>{
      this.cart_items = [];
      this.dataSource = new MatTableDataSource(this.cart_items)
    })
  }

}
