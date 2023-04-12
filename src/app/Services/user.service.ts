import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seller } from '../Models/seller';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private URL:string=environment.ApiUrl+"api/";

  AddSeller(seller:Seller) {
    return this.http.post(this.URL+"Seller",seller);
  }

  GetSellers(){
    return this.http.get(this.URL+"Seller");
  }
}
