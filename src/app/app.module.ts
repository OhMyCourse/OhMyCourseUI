import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorComponent } from './constructor/constructor.component';
import { MainComponent } from './main/main.component';
import { LeftSideMenuComponent } from './constructor/left-side-menu/left-side-menu.component';
import { CoursePageComponent } from './constructor/course-page/course-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ConstructorComponent,
    MainComponent,
    LeftSideMenuComponent,
    CoursePageComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
