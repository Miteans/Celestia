import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  coffees:any[] = [];
  co_items:any[]=[];
  icecreams:any[] = [];
  ic_items:any[]=[];
  snacks: any[] = [];
  sn_items:any[]=[];
  juices:any[]=[];
  ju_items:any[]=[];
  cakes: any[] = [];
  ca_items:any[]=[];
  constructor(private menuService:MenuService) { }
  cf:boolean;
  sn:boolean;
  ck:boolean;
  ic:boolean;
  ju:boolean;
  
  coffee_details(){
    this.menuService.get_coffee_details().subscribe(res => {
      this.coffees = res['coffees'];
      this.co_items=this.coffees[0]['Categories']['items'];
      console.log(this.co_items);
    })
  }

  cake_details(){
    this.menuService.get_cake_details().subscribe(res => {
      this.cakes = res['cakes'];
      this.ca_items=this.cakes[0]['Categories']['items'];
      console.log(this.ca_items);
    })
  }

  icecream_details(){
    this.menuService.get_icecream_details().subscribe(res => {
      this.icecreams = res['icecreams'];
      this.ic_items=this.icecreams[0]['Categories']['items'];
      console.log(this.ic_items);
    })
  }

  snack_details(){
    this.menuService.get_snack_details().subscribe(res => {
      this.snacks = res['snacks'];
      this.sn_items=this.snacks[0]['Categories']['items'];
      console.log(this.sn_items);
    })
  }

  juice_details(){
    this.menuService.get_juice_details().subscribe(res => {
      this.juices = res['juices'];
      this.ju_items=this.juices[0]['Categories']['items'];
      console.log(this.ju_items);
    })
  }

  coffee_display()
  {
    this.cf = true;
    this.ck = this.ju= this.sn = this.ic = false;
    this.coffee_details()
  }

  cake_display()
  {
    this.ck = true;
    this.cf = this.ju= this.sn = this.ic = false;
    this.cake_details()
  }

  snack_display()
  {
    this.sn = true;
    this.ck = this.ju= this.cf = this.ic = false;
    this.snack_details()
  }

  icecream_display()
  {
    this.ic = true;
    this.ck = this.ju= this.sn = this.cf = false;
    this.icecream_details()
  }

  juice_display()
  {
    this.ju = true;
    this.ck = this.sn = this.ic =this.cf= false;
    this.juice_details()
  }

  ngOnInit() {

  }

}
  




