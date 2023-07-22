import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.scss']
})
export class UnknownComponent implements OnInit {
  href:string = "";

  constructor(private router:Router) {}

  ngOnInit(): void {
      this.href = this.router.url;
  }  
}
