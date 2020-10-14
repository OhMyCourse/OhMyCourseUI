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
import { AudioBlockComponent } from './constructor/shared/components/audio-block/audio-block.component';
import { SafeHtmlPipe } from './constructor/shared/pipes/safe-html.pipe';
import { TestBlockComponent } from './constructor/shared/components/test-block/test-block.component';
import { TestMultipleComponent } from './constructor/shared/components/test-block/test-multiple/test-multiple.component';
import { TestOneComponent } from './constructor/shared/components/test-block/test-one/test-one.component';
import { TestShortComponent } from './constructor/shared/components/test-block/test-short/test-short.component';
import { AnswerMultipleFormComponent } from './constructor/shared/components/test-block/test-multiple/answer-multiple-form/answer-multiple-form.component';
import { QuestionFormComponent } from './constructor/shared/components/test-block/question-form/question-form.component';

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
    AudioBlockComponent,
    SafeHtmlPipe,
    TestBlockComponent,
    TestMultipleComponent,
    TestOneComponent,
    TestShortComponent,
    AnswerMultipleFormComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  providers: [SafeHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
