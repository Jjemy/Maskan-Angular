import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
  { path: 'about', component: AboutUsComponent },
  { path:'add-property',component:AddPropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
