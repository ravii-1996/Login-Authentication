
import { Component, OnInit } from '@angular/core';
import { LookupService } from '../lookup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public lookupService : LookupService) { }

  ngOnInit(): void {
  }

}
