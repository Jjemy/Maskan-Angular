import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  pageTitle: string = 'About Us';
  companyDescription: string = 'Welcome to our company! We are a leading technology company specializing in web development, mobile app development, and cloud computing. With a team of skilled professionals, we strive to deliver cutting-edge solutions to our clients.';
}