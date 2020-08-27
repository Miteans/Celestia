import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'footer',
    component:FooterComponent
  },
  {
    path:'menu',
    component:MenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
