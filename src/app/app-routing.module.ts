import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { PropertyGridComponent } from'./property-grid/property-grid.component';
import { LoginComponent } from './login/login.component';
import { AnalysisComponent } from './analysis/analysis.component';


const routes: Routes = [
  { path: 'about', component: AboutUsComponent },
  { path:'add-property',component:AddPropertyComponent},
  {path:'',component:HomeComponent},
  {path:'single-property/:id',component:SinglePropertyComponent},
  {path:'property-grid',component:PropertyGridComponent},
  {path:'login',component:LoginComponent},
  {path:'analysis',component:AnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
