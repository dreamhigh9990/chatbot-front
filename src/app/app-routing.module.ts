import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./src/login/login.component";
import { RegisterationComponent } from "./registeration/registeration.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ChatComponent } from "./chat/chat.component";
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegisterationComponent },
  { path: "", component: DashboardComponent },
  { path: "chat", component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
