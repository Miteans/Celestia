import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog'
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';


import { MenuService } from  './services/menu.service';
import { PopUpsComponent } from './pop-ups/pop-ups.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StatsComponent } from './stats/stats.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    PopUpsComponent,
    CartComponent,
    SidenavComponent,
    StatsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,

    Ng2GoogleChartsModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
