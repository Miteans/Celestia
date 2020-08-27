import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hide = true;
  show_button = false;
  constructor() { }

  ngOnInit(): void {
  }

  show_hidden(){
    if(this.hide){
      this.hide = false
    }
    else{
      this.hide = true
    }
  }

  call_button(){
    this.show_button = true;
  }
}
