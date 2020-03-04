import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-edit-exco',
  templateUrl: './edit-exco.component.html',
  styleUrls: ['./edit-exco.component.css']
})
export class EditExcoComponent implements OnInit {
  data: any;
  name;
  post;
  email;
  department;
  mobile;
  number;
  image_url;
  id;

  excoForm: FormGroup;
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

    this.excoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      post: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])]
    });

    this.data = this.router.getCurrentNavigation().extras.state;
    if (this.data == null) {
      this.router.navigateByUrl('dashboard')
    }
    this.excoForm.controls['name'].setValue(this.data.name);
    this.excoForm.controls['post'].setValue(this.data.post);
    this.excoForm.controls['email'].setValue(this.data.email);
    this.excoForm.controls['department'].setValue(this.data.department);
    this.excoForm.controls['mobile'].setValue(this.data.mobile);
    this.excoForm.controls['number'].setValue(this.data.number);
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

  editExcos(id) {
    this.submitAttempt = true;
    // this.loader.showLoader();
    let payload = {
      name: this.excoForm.value.name,
      post: this.excoForm.value.post,
      email: this.excoForm.value.email,
      department: this.excoForm.value.department,
      mobile: this.excoForm.value.mobile,
      number: this.excoForm.value.number,
      image_url: this.image_url
    }

    // console.log('data : ', this.fileUpload)
    if (this.fileUpload == undefined) {
      console.log('payload : no upload', payload)
      this.service.EditExcos(id, payload).subscribe(user => {
        this.router.navigateByUrl('/dashboard')
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

            this.service.EditExcos(id, payload).subscribe(user => {
              this.router.navigateByUrl('/dashboard')
            }, error => {
              console.log('Error : ', error)
            });
          })
        })).subscribe()
    }

  }


}
