import { Component, OnInit } from '@angular/core';
import { Property } from '../Models/property';
import { PropertyService } from '../Services/property.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}) 
export class HomeComponent implements OnInit {

  properties:Property[]=[];
  img:string[]=[];
  loc:string[]=[];
  area:number[]=[];
  level:number[]=[];
  rooms:number[]=[];
  brooms:number[]=[];
  price:number[]=[];
  deal:string[]=[];

  constructor(private propertyService:PropertyService) { }
  ngOnInit(): void {
     this.propertyService.getAllProperties()
    .subscribe({
      next: (properties) => {
        this.properties=properties;
        let l=properties.length-1;
        for (let i = 0; i <= l; i++) {
          this.img[i]=this.properties[l-i]["images"][0]["imageLink"];   
          this.loc[i]=this.properties[l-i]["location"];   
          this.area[i]=this.properties[l-i]["area"];  
          this.rooms[i]=this.properties[l-i]["roomsNum"];    
          this.price[i]=this.properties[l-i]["price"];    
          this.brooms[i]=this.properties[l-i]["bathsNum"];    
          this.level[i]=this.properties[l-i]["level"];    
          this.deal[i]=this.properties[0]["dealType"]["type"];
        }
        //test
        //console.log(this.properties[0]["dealType"]["type"])

      },
      error: (response) => {
        console.log(response);
      } 
    }
    );
  }


}
