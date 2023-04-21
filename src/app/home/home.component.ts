import { Component, Injectable, OnInit } from '@angular/core';
import { Property } from '../Models/property';
import { PropertyService } from '../Services/property.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}) 
@Injectable()
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
  id:number[]=[];

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
          this.deal[i]=this.properties[l-i]["dealType"]["type"];
          this.id[i]=this.properties[l-i]["propertyID"];
        }
        //test
        //console.log(this.properties[0]["propertyID"])

      },
      error: (response) => {
        console.log(response);
      } 
    }
    );
  }


}
