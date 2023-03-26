import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../Models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  private URL:string=environment.ApiUrl+"Property/";

  AddProperty(property:Property) {
    return this.http.post(this.URL+"PostProperty",property);
  }
}