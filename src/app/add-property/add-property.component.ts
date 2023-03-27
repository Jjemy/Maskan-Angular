import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../Models/property';
import { Seller } from '../Models/seller';
import { PropertyService } from '../Services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {

  constructor(private propertyService:PropertyService, private router:Router, private fb:FormBuilder) { }

  errMsg="";
  SellForm:FormGroup;
  Form:any;
  seller:Seller;
  property:Property

  isRental: boolean = false;
  isPurchase: boolean = false;

  toggleCheckboxes(event: any) {
    if (event.target.checked) {
      this.isRental = true;
      this.isPurchase = false;
    } else {
      this.isRental = false;
      this.isPurchase = true;
    }
  }

  addProperty(){
    this.Form=Object.assign({},this.SellForm.value);
    let {SellerName, SellerEmail, PhoneNum, SellerAddress, NationalID}=this.Form;
    let {Location, GoogleMapsLink, Type, Level, Furnished, Region, Area, RoomsNum, BathsNum, Price}=this.Form;
    this.seller={SellerName, SellerEmail, PhoneNum, SellerAddress, NationalID};
    this.property={Location, GoogleMapsLink, Type, Level, Furnished, Region, Area, RoomsNum, BathsNum, Price};
    console.log(this.seller,this.property);
    if(this.SellForm.valid){
      /* this.propertyService.AddProperty(this.property).subscribe(
        ()=>{
          this.router.navigate(['/']);
        },(error)=>{
          this.errMsg=error.error;
        }
      ) */
    }
    else{
      let propertyInvalid=[];
      let sellerInvalid=[];
      let propertyControls=this.SellForm.controls;
      let sellerControls=this.SellForm.controls;
      for (const name in propertyControls){
        if(propertyControls[name].invalid){
          propertyInvalid.push(name);
        }
      }
      for(const name in sellerControls){
        if(sellerControls[name].invalid){
          sellerInvalid.push(name);
        }
      }
      console.log(propertyInvalid,sellerInvalid);
    }
  }

  createSellForm(){
    this.SellForm=this.fb.group({
      SellerName:['',Validators.required],
      SellerEmail:['', [Validators.email, Validators.required]],
      PhoneNum:['',[Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      SellerAddress:['',Validators.required],
      NationalID:['',[Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(10)]],
      Location:['',Validators.required],
      GoogleMapsLink:['',Validators.nullValidator],
      Type:['', Validators.required],
      Level:['', Validators.required],
      Furnished:['', Validators.required],
      Region:['', Validators.required],
      Area:['', Validators.required],
      RoomsNum:['', Validators.required],
      BathsNum:['', Validators.required],
      Price:['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.createSellForm();
  }
}
