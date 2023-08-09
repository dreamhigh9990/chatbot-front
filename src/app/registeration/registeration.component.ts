import { Component, OnInit } from "@angular/core";
import { User } from "../formsvalue";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./registeration.component.html",
  styleUrls: ["./registeration.component.css"]
})
export class RegisterationComponent implements OnInit {
  data = new User();
  constructor(private httpclient: HttpClient, private router: Router) {}
  public apiUrl = " http://localhost:3000/api/signup";
  ngOnInit() {}
  onsubmit() {
    return this.httpclient
      .post(this.apiUrl, this.data)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.router.navigateByUrl("/login");
        }
      });
  }
}
