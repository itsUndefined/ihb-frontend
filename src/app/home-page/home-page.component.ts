import {Component, OnInit} from '@angular/core';
import {faFacebookSquare, faTwitterSquare, faInstagramSquare, faGooglePlusSquare} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;
  faGooglePlusSquare = faGooglePlusSquare;

  constructor() {
  }

  ngOnInit(): void {
  }
}
