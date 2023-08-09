import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../formsvalue";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  data = new User();
  constructor(private httpclient: HttpClient, private router: Router) {}
  public apiUrl = " http://localhost:3000/api/login";
  ngOnInit() {}
  onsubmit() {
    return this.httpclient
      .post(this.apiUrl, this.data)
      .subscribe((res: any) => {
        localStorage.setItem("Token", res);
        this.router.navigateByUrl("/");
      });
  }
}
