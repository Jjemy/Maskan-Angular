import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../Services/property.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css',
]
  
})
export class SinglePropertyComponent implements OnInit {

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  area:number;
  price:number;
  level:number;
  seller:string;
  rooms:number;
  brooms:number;
  vr:SafeResourceUrl;
  img:any[]=[];
  loc:string;
  type:string;
  safeUrl: SafeResourceUrl;
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

  sendWhatsAppMessage() {
    const phoneNumber = "+201205637866";
    var messageText="Hi, Im interested in the property "+this.loc;
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl);
  }

  constructor(private route: ActivatedRoute,private propertyservice:PropertyService,private sanitizer: DomSanitizer) { }

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
              this.loc=response["location"]
              this.vr=this.sanitizer.bypassSecurityTrustResourceUrl(response["vrLink"])
              this.type=response["type"]
              this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response["googleMapsLink"]);
              this.seller=response["seller"]["sellerName"]
    
                for(let i=0;i<response["images"].length;i++){
                  this.img[i]=response["images"][i]["imageLink"]
               }
            }
          });
        }
      }
    })
  }
}
