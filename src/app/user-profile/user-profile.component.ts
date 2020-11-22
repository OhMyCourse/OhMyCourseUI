import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MediaService } from '../services/media.service';
import { ProfileMenuItem } from '../shared/models/ProfileMenuItem';
import { UserProfile } from '../shared/models/UserProfile';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  menuItems: ProfileMenuItem[] = [
    new ProfileMenuItem('My profile', true, '/user/profile'),
    new ProfileMenuItem('My courses', false, '/user/courses'),
    new ProfileMenuItem('Certificates', false, '/user/certificates'),
  ];

  @ViewChild('file') file;

  imageToUpload: File;

  editMode = false;

  profile = new UserProfile(
    'Vasya Pupkin',
    'vasya.pupkin@gmail.com',
    new Date('01/01/2021'),
    1,
    2,
    null,
    281
  );

  form: FormGroup = this.fb.group({});

  constructor(
    private mediaService: MediaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mediaService.getMediaById(this.profile.mediaId).subscribe((image) => {
      this.profile.loadImage(image);
    });
  }

  onEditIconClick() {
    this.changeEditIcon();

    this.initForm();
  }

  onSaveIconClick() {
    this.changeEditIcon();

    this.router.navigateByUrl('/user/profile');
  }

  onImageUpload(): void {
    this.file.nativeElement.click();
  }

  onFileAdded(files: FileList): void {
    this.imageToUpload = files.item(0);
    this.loadFile(this.imageToUpload);
  }

  loadFile(file: File) {
    const reader = new FileReader();
    of(file)
      .pipe(delay(500))
      .subscribe((data) => {
        reader.readAsDataURL(data);
        reader.onload = (event) => {
          this.avatar.setValue((event.target as FileReader).result);
        };
      });
  }

  get avatar() {
    return this.form.controls['avatarControl'];
  }

  private changeEditIcon() {
    this.editMode = !this.editMode;
  }

  private initForm() {
    this.form = this.fb.group({
      emailControl: [
        this.profile.email,
        [Validators.required, Validators.email],
      ],
      dateBirthControl: [this.profile.dateOfBirth, [Validators.required]],
      biographyControl: [this.profile.biography],
      avatarControl: [null, [Validators.required]],
    });
  }
}
