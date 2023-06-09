import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PropertyService } from './Services/property.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { PropertyGridComponent } from './property-grid/property-grid.component';
import { LoginComponent } from './login/login.component';
import { GalleriaModule } from 'primeng/galleria';
import { AnalysisComponent } from './analysis/analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    SinglePropertyComponent,
    PropertyGridComponent,
    LoginComponent,
    AnalysisComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    GalleriaModule
  ],
  providers: [
    PropertyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
