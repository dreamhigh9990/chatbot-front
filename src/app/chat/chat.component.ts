import { Component, OnInit } from "@angular/core";
import jwt from "jwt-decode";
import { User } from "../formsvalue";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  public token: any = "";
  public userName: any = "";
  data = new User();
  users = [];
  chat = [];
  public chattinguser = "";
  public chattinguserID = "";

  constructor(private httpclient: HttpClient, private router: Router) {}
  public apiUrl = " http://localhost:3000/api/user";
  public apipostUrl = " http://localhost:3000/api/sendMessage";
  public apigetchatUrl = " http://localhost:3000/api/GetChat";

  ngOnInit() {
    this.token = jwt(localStorage.getItem("Token"));
    this.userName = this.token.user.name;

    return this.httpclient.get(this.apiUrl).subscribe((res: any) => {
      this.users = res.data;
      // this.users = res.data.filter(item => {
      //   return item.id === this.token.id;
      // });
      this.chattinguser = res.data[0].name;
      this.chattinguserID = res.data[0].id;
      this.GetChat();

    });
  }
  onsubmit() {
    this.token = jwt(localStorage.getItem("Token"));
    const userid = this.token.user.id;
    const reciverid = this.chattinguserID;
    const message = this.data.message;
    const chatdata = {
      senderid: userid,
      reciverid: reciverid,
      message: message
    };
    return this.httpclient
      .post(this.apipostUrl, chatdata)
      .subscribe((res: any) => {
        this.data = new User();
        this.GetChat();
      });
  }

  GetChat() {
    this.token = jwt(localStorage.getItem("Token"));
    const userid = this.token.user.id;
    return this.httpclient
      .post(this.apigetchatUrl, {
        sender_id: userid,
        reciever_id: this.chattinguserID
      })
      .subscribe((res: any) => {
        this.chat = res.data;
      });
  }
  Search() {
    let filter, result, serchDiv, i, txtValue, input;
    input = document.getElementById("serchName");
    filter = input.value.toUpperCase();
    result = document.getElementById("serchingName");
    serchDiv = document.getElementsByClassName("directory");

    for (i = 0; i < serchDiv.length; i++) {
      txtValue = serchDiv[i].textContent || serchDiv[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        serchDiv[i].style.display = "";
      } else {
        serchDiv[i].style.display = "none";
      }
    }
  }
  chatting(data) {
    this.chattinguser = data["name"];
    this.chattinguserID = data["id"];
    this.GetChat();
  }
  senderchat(id) {
    return this.chat.filter(x => x.sender_id === id)
  }
  receivercat() {
    this.token = jwt(localStorage.getItem("Token"));
    const userid = this.token.user.id;
    return this.chat.filter(x => x.sender_id === userid)
  }
}
