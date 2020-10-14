import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './app-material.module';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorComponent } from './constructor/constructor.component';
import { MainComponent } from './main/main.component';
import { CoursePageComponent } from './constructor/course-page/course-page.component';
import { TextBlockComponent } from './constructor/shared/components/text-block/text-block.component';
import { BlocksMenuComponent } from './constructor/blocks-menu/blocks-menu.component';
import { AppNavMenuComponent } from './app-nav-menu/app-nav-menu.component';
import { ImageBlockComponent } from './constructor/shared/components/image-block/image-block.component';
import { TipBlockComponent } from './constructor/shared/components/tip-block/tip-block.component';
import { VideoBlockComponent } from './constructor/shared/components/video-block/video-block.component';

@NgModule({
  declarations: [
    AppComponent,
    ConstructorComponent,
    MainComponent,
    CoursePageComponent,
    TextBlockComponent,
    BlocksMenuComponent,
    AppNavMenuComponent,
    ImageBlockComponent,
    TipBlockComponent,
    VideoBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
