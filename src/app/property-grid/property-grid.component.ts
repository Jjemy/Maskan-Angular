import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../Services/property.service';
import { Property } from '../Models/property';


@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit {
  properties:Property[]=[];
  img:string[]=[];
  loc:string[]=[];
  area:number[]=[];
  level:number[]=[];
  rooms:number[]=[];
  brooms:number[]=[];
  price:number[]=[];
  deal:string[]=[];
  id:number[]=[];
  

  constructor(private propertyService:PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getAllProperties()
    .subscribe({
      next: (properties) => {
        this.properties=properties;
        let l=properties.length-1;
        for (let i = 0; i <= l; i++) {
          this.img[i]=this.properties[i]["images"][0]["imageLink"];   
          this.loc[i]=this.properties[i]["location"];   
          this.area[i]=this.properties[i]["area"];  
          this.rooms[i]=this.properties[i]["roomsNum"];    
          this.price[i]=this.properties[i]["price"];    
          this.brooms[i]=this.properties[i]["bathsNum"];    
          this.level[i]=this.properties[i]["level"];    
          this.deal[i]=this.properties[i]["dealType"]["type"];
          this.id[i]=this.properties[i]["propertyID"];
        }

      },
      error: (response) => {
        console.log(response);
      } 
    }
    );
  }

}
