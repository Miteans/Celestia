import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { formatDate } from '@angular/common';
import { GoogleChartInterface, GoogleChartComponent } from 'ng2-google-charts'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  categories:any[];
  type_of_stat:any;
  day_mode:any;
  selected_category:any;
  dateFormat: string;
  showGraph: boolean;
  item_sales_chartdata: GoogleChartInterface;
  popular_items: any = [];
  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    this.get_categories();
  }

  get_categories(){
    this.menuService.get_categories().subscribe(data=>{
      this.categories = data['categories']['categories']
      console.log(this.categories);
    })
  }

  onTabClick(event){
    this.type_of_stat =  event['tab']['textLabel'];
  }

  onSubmit(){
    this.showGraph = false;
    console.log(this.day_mode)
    console.log(this.selected_category)
    this.menuService.get_item_sales_details(this.day_mode,this.selected_category).subscribe(data=>{
      console.log(data['item-sales']);
      this.item_sales_ChartData(data['item-sales'])
    })
  }

  item_sales_ChartData(data){
    let k = 0;
    this.popular_items = [];
    let chart_data = [];
    console.log(data);
    chart_data.push(['name', 'total_sales']);
    data.sort((n1,n2)=>{
      if(n1.total_sales > n2.total_sales){
        return -1;
      }
      else{
        return 1;
      }
    })
    data.forEach(element => {
      if(k < 3){
        this.popular_items.push(element);
      }
      k += 1;
      chart_data.push([element.item_name,element.total_sales]);
    });
    console.log(chart_data);
    this.setChart(chart_data);
  }

  setChart(dataTable){
    this.showGraph = true
    this.item_sales_chartdata =
    {
      chartType: "PieChart",
      dataTable: dataTable,
      options: {
        height: 400,
        is3D: true
      }
    };
  }

}
