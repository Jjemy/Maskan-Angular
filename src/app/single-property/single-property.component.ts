import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../Services/property.service';


@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css',
]
  
})
@Injectable()
  export class SinglePropertyComponent implements OnInit {

  area:number;
  price:number;
  level:number;
  seller:string;
  phone:number;
  email:string;
  rooms:number;
  brooms:number;
  vr:string;
  img:any[]=[];
  loc:string;
  type:string;

  currentIndex = 0;
  translateValue = 0;

  next() {
    if (this.currentIndex < this.img.length - 1) {
      this.currentIndex++;
      this.translateValue -= 100;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateValue += 100;
    }
  }

  constructor(private route: ActivatedRoute,private propertyservice:PropertyService) { }

   ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
         var i=params.get('id');
         var id:number= +i;
        if (id) {
          this.propertyservice.getIdProperty(id).subscribe({
            next:(response)=>{
              this.area=response["area"]
              this.price=response["price"]
              this.level=response["level"]
              this.rooms=response["roomsNum"]
              this.brooms=response["bathsNum"]
              this.email=response["seller"]["sellerEmail"]
              this.loc=response["location"]
              this.phone=response["seller"]["phoneNum"]
              this.vr=response["vrLink"]
              this.type=response["type"]
              this.seller=response["seller"]["sellerName"]
                for(let i=0;i<response["images"].length;i++){
                  this.img[i]=response["images"][i]["imageLink"]
                  console.log(response)
                }
            }
          });
        }
      }
    })
  }
}