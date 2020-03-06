import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  data: any;
  title;
  details;
  image_url;
  id;

  blogForm: FormGroup;
  submitAttempt;
  fileUpload;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(public router: Router, private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    public service: DashboardService,
    private cd: ChangeDetectorRef) {

    this.blogForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])]
    });

    this.data = this.router.getCurrentNavigation().extras.state;
    if (this.data == null) {
      this.router.navigateByUrl('blog')
    }
    this.blogForm.controls['title'].setValue(this.data.title);
    this.blogForm.controls['details'].setValue(this.data.details);
    // this.excoForm.controls['image_url'].setValue(this.data.image_url);

    this.image_url = this.data.image_url;
    this.id = this.data._id;
  }

  ngOnInit() {

  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileUpload = file;
      // console.log('file data: ', this.fileUpload);
    }
  }

  editBlog(id) {
    this.submitAttempt = true;
    // this.loader.showLoader();
    let payload = {
      title: this.blogForm.value.title,
      details: this.blogForm.value.details,
      image_url: this.image_url
    }

    // console.log('data : ', this.fileUpload)
    if (this.fileUpload == undefined) {
      console.log('payload : no upload', payload)
      this.service.EditBlog(id, payload).subscribe(user => {
        this.router.navigateByUrl('/apps')
      }, error => {
        console.log('Error : ', error)
      });
    } else {
      const path = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(path);
      this.task = this.ref.put(this.fileUpload);
      this.uploadProgress = this.task.percentageChanges();

      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url) => {
            this.downloadURL = url;
            payload.image_url = this.downloadURL;
            console.log('payload : upload present', payload)

            this.service.EditBlog(id, payload).subscribe(user => {
              this.router.navigateByUrl('/apps')
            }, error => {
              console.log('Error : ', error)
            });
          })
        })).subscribe()
    }

  }


}