import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ElementModule } from './element.module'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
