import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { SinglePropertyComponent } from './single-property/single-property.component';
import { PropertyGridComponent } from'./property-grid/property-grid.component';


const routes: Routes = [
  { path: 'about', component: AboutUsComponent },
  { path:'add-property',component:AddPropertyComponent},
  {path:'',component:HomeComponent},
  {path:'single-property/:id',component:SinglePropertyComponent},
  {path:'property-grid',component:PropertyGridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
