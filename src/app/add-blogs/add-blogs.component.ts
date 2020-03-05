import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../_services/dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.css']
})
export class AddBlogsComponent implements OnInit {

  blogForm: FormGroup;
  submitAttempt;
  fileUpload;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    public service: DashboardService,
    private afStorage: AngularFireStorage,
    private router: Router,
    private cd: ChangeDetectorRef) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

  }
  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileUpload = file;
      console.log('file data: ', this.fileUpload);
    }
  }
  addBlog() {
    this.submitAttempt = true;
    // if (!this.blogForm.valid) {
    //   this.validateAllFormFields(this.blogForm);
    //   return;
    // }
    // this.loader.showLoader();
    // const path = Math.random().toString(36).substring(2);
    // this.ref = this.afStorage.ref(path);
    // this.task = this.ref.put(this.fileUpload);
    // this.uploadProgress = this.task.percentageChanges();

    // this.task.snapshotChanges().pipe(
    //   finalize(() => {
    //     this.ref.getDownloadURL().subscribe((url) => {
    //       this.downloadURL = url
          
    //       this.service.addBlogs(payload).subscribe(user => {
    //         this.router.navigateByUrl('/apps')
    //       }, error => {
    //         console.log('Error : ', error)
    //         // this.loader.presentToast(error.error.error);
    //         // this.loader.presentToast(error.error.message);
    //       });
    //       // location.reload()
    //     })
    //   })).subscribe()

    let payload = {
      title: this.blogForm.value.title.toString,
      details: this.blogForm.value.details.toString
    }
    console.log('payload : ', payload);
    this.service.addBlogs(payload).subscribe(user => {
      console.log('data saved')
    }, error => {
      console.log('Error : ', error.error)
      // this.loader.presentToast(error.error.error);
      // this.loader.presentToast(error.error.message);
    });
  }
 
}
