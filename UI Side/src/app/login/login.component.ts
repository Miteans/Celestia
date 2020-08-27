import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  flag = false;
  constructor(private route:Router) { }

  ngOnInit() {
  }
  login_validate(){
    if(this.username == 'admin' && this.password == '12345678'){
      this.route.navigate(["/cafe"]);
    }
  }
  next_page(){
    this.flag = true;
  }
  

}
