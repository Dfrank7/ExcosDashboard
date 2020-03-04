import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DashboardService } from '../_services/dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-excos',
  templateUrl: './add-excos.component.html',
  styleUrls: ['./add-excos.component.css']
})
export class AddExcosComponent implements OnInit {

  excoForm: FormGroup;
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
    this.excoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      post: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])]
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
  addExcos() {
    this.submitAttempt = true;
    // this.loader.showLoader();
    const path = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(path);
    this.task = this.ref.put(this.fileUpload);
    this.uploadProgress = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe((url) => {
          this.downloadURL = url;
          let payload = {
            name: this.excoForm.value.name,
            post: this.excoForm.value.post,
            email: this.excoForm.value.email,
            department: this.excoForm.value.department,
            mobile: this.excoForm.value.mobile,
            number: this.excoForm.value.number,
            image_url:this.downloadURL
          }
          
          this.service.addExcos(payload).subscribe(user => {
            this.router.navigateByUrl('/dashboard')
          }, error => {
            console.log('Error : ', error)
            // this.loader.presentToast(error.error.error);
            // this.loader.presentToast(error.error.message);
          });
          // location.reload()
        })
      })).subscribe()
  }
 
}
