import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private adminService:AdminService, private router:Router) { }
  
  currentUrl:string;
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        if(this.currentUrl.includes('about')){
          document.querySelector('#home').classList.remove('active');
          document.querySelector('#about').classList.add('active');
          document.querySelector('#analysis').classList.remove('active');
          document.querySelector('#properties').classList.remove('active');
          document.querySelector('#add')?.classList.remove('active');
        }
        else if(this.currentUrl.includes('analysis')){
          document.querySelector('#home').classList.remove('active');
          document.querySelector('#about').classList.remove('active');
          document.querySelector('#analysis').classList.add('active');
          document.querySelector('#properties').classList.remove('active');
          document.querySelector('#add')?.classList.remove('active');
        }
        else if(this.currentUrl.includes('property-grid')){
          document.querySelector('#home').classList.remove('active');
          document.querySelector('#about').classList.remove('active');
          document.querySelector('#analysis').classList.remove('active');
          document.querySelector('#properties').classList.add('active');
          document.querySelector('#add')?.classList.remove('active');
        }
        else if(this.currentUrl.includes('add-property')){
          document.querySelector('#home').classList.remove('active');
          document.querySelector('#about').classList.remove('active');
          document.querySelector('#analysis').classList.remove('active');
          document.querySelector('#properties').classList.remove('active');
          document.querySelector('#add')?.classList.add('active');
        }
        else{
          document.querySelector('#home').classList.add('active');
          document.querySelector('#about').classList.remove('active');
          document.querySelector('#analysis').classList.remove('active');
          document.querySelector('#properties').classList.remove('active');
          document.querySelector('#add')?.classList.remove('active');
        }
      }})
  }

  loggedIn() {
    return this.adminService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.adminService.decodedToken = null;
    localStorage.removeItem('user');
    this.adminService.currentUser = null;
    this.router.navigate(['']);
  }

}
