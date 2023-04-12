import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../Models/property';
import { ModelInput } from '../Models/model-input';
import { Images } from '../Models/images';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  private URL:string=environment.ApiUrl+"Property/";

  AddProperty(property:Property) {
    return this.http.post(this.URL+"PostProperty",property);
  }

  AddImage(image:Images){
    return this.http.post(this.URL+"PostImages",image);
  }
  predictPrice(model:ModelInput){
    return this.http.post(this.URL+"PredictPrice",model);
  }
}