import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Property } from '../Models/property';
import { Seller } from '../Models/seller';
import { PropertyService } from '../Services/property.service';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { HttpClient } from '@angular/common/http';
import { ModelInput } from '../Models/model-input';
import { UserService } from '../Services/user.service';
import { Images } from '../Models/images';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {

  constructor(private http:HttpClient, private propertyService:PropertyService,private adminService: AdminService,
    private userService:UserService, private router:Router, private fb:FormBuilder) { }

  errMsg="";
  SellForm:FormGroup;
  Form:any;
  sellers:Seller[];
  seller:Seller;
  property:Property;
  modelInput:ModelInput;
  image:Images={
    imageLink:"link",
    propertyID:0
  };
  regions:any[];
  categories:any[];
  regNames:string[]=[];
  displayedReg:string;
  price:number=0;
  submitted:boolean=false;
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

  async addProperty(){
    this.submitted=true;
    this.Form=Object.assign({},this.SellForm.value);
    this.Form.dealTypeID=this.Form.DealType=="Rental"?1:2;
    this.Form.Furnished=this.Form.Furnished=="true"?true:false;
    this.Form.Type=this.Form.Type.label;
    let {sellerName, sellerEmail, phoneNum, sellerAddress, nationalID}=this.Form;
    let {Location, GoogleMapsLink, Type, Level, Furnished, Area, RoomsNum, BathsNum, Price, dealTypeID}=this.Form;
    this.seller={sellerName, sellerEmail, phoneNum, sellerAddress, nationalID};
    this.property={Location, GoogleMapsLink, Type, Level, Furnished, Area, RoomsNum, BathsNum, Price, dealTypeID, sellerID:0};
    if(this.SellForm.valid){
      if(this.sellers.length>0 && this.sellers.find(a=>a.nationalID==this.Form.nationalID)){
        this.sellers.forEach(seller => {
          if(seller.nationalID==this.Form.nationalID){
            this.property.sellerID=seller.sellerID;
          }
        });
      }
      else{
        try {
          const seller = await this.userService.AddSeller(this.seller).toPromise();
          this.property.sellerID = (seller as any).sellerID;
        } catch (error) {
          this.errMsg = error.error;
        }
      }
      try {
        const a = await this.propertyService.AddProperty(this.property).toPromise();
        this.Form.imageLinks.forEach(async image => {
          this.image.imageLink = image;
          this.image.propertyID = (a as any).propertyID;
          await this.propertyService.AddImage(this.image).toPromise();
        });
        alert("Done");
        this.router.navigate(['/']);
      } catch (error) {
        this.errMsg = error.error;
      }
    }
    else{ 
      let propertyInvalid=[];
      let propertyControls=this.SellForm.controls;
      for (const name in this.SellForm.controls){
        if(propertyControls[name].invalid){
          propertyInvalid.push(name);
        }
      }
      console.log(propertyInvalid);
    }
  }

  predictPrice(){
    this.submitted=true;
    this.SellForm.get('Price').markAsPristine();
    this.SellForm.get('Price').setErrors(null);
    this.Form=Object.assign({},this.SellForm.value);
    this.Form.Furnished=this.Form.Furnished=="true"?true:false;
    let Furnished=this.Form.Furnished==true?1:0;
    let DealType=this.Form.DealType=="Rental"?1:0;
    let Region=this.Form.Region.value;
    let Type=this.Form.Type.value;
    let {Level, Area, RoomsNum, BathsNum}=this.Form;
    this.modelInput={Type, Level, Furnished, Area, RoomsNum, BathsNum, Region, DealType};
    this.propertyService.predictPrice(this.modelInput).subscribe(a=>
      this.price=parseInt(Object.values(a)[0])
    );
  }

  get Images(){
    return this.SellForm.get('imageLinks') as FormArray
  }

  addImage(){
    this.Images.push(new FormControl);
  }

  removeImage(i?:number){
    this.Images.removeAt(i);
  }

  createSellForm(){
    this.SellForm=this.fb.group({
      sellerName:['',Validators.required],
      sellerEmail:['', [Validators.email, Validators.required]],
      phoneNum:['',[Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      sellerAddress:['',Validators.required],
      nationalID:['',[Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(10)]],
      Location:['',Validators.required],
      GoogleMapsLink:['',Validators.nullValidator],
      DealType:['', Validators.required],
      Type:['', Validators.required],
      Level:['', [Validators.required, Validators.max(80), Validators.min(0)]],
      Furnished:['', Validators.required],
      Region:['', Validators.required],
      Area:['', Validators.required],
      RoomsNum:['', Validators.required],
      BathsNum:['', Validators.required],
      Price:['', Validators.required],
      VrLink:['',Validators.nullValidator],
      dealTypeID: ['', Validators.nullValidator],
      imageLinks: new FormArray([],Validators.required)
    })
  }

  ngOnInit(): void {
    this.http.get('../../assets/regions.json').subscribe((data: any) => {
      this.regions = data.regions;
    });
    this.http.get('../../assets/Type.json').subscribe((data: any) => {
      this.categories = data.categories;
    });
    this.userService.GetSellers().subscribe(a=>
      this.sellers=Object.values(a)
    )
    this.createSellForm();
  }
}
