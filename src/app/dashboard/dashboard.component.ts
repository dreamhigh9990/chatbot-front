import { Component, OnInit } from "@angular/core";
import jwt from "jwt-decode";
import {User} from '../formsvalue';
import { Router } from "@angular/router";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public token: any = "";
  public userName: any = "";
  data = new User()
  constructor(private router: Router) {}

  ngOnInit() {
    this.token = jwt(localStorage.getItem("Token"));
    this.userName = this.token.user.name
  }
  onsubmit() {
    console.log('hello')
  }
  Onchat() {
    this.router.navigateByUrl('/chat')
  }
}
