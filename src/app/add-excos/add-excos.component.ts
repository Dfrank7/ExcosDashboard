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
  id_value;
  post_value;
  excoForm: FormGroup;
  submitAttempt;
  fileUpload;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  posts = [{
    id: '1',
    name: 'President'
   },
   {
    id: '2',
    name: 'V.President'
   },
   {
    id: '3',
    name: 'Gen.Secretary'
   },
   {id: '4',
    name: 'Asst.Gen.Secretary'
   },
   {
    id: '5',
    name: 'Fin.Secretary'
   },
   {
    id: '6',
    name: 'Treasurer'
   },
   {id: '7',
    name: 'PRO (f)'
   },
   {
    id: '8',
    name: 'PRO(m)'
   },
   {id: '9',
    name: 'Welfare Officer(f)'
   },
   {
    id: '10',
    name: 'Welfare Officer(m)'
   },
   {
    id: '11',
    name: 'Protocol Officer(f) '
   },
   {id: '12',
    name: 'Protocol Officer(m)'
   },
   {
    id: '13',
    name: 'Academic Coordinator(f)'
   },
   {
    id: '14',
    name: 'Academic Coordinator (m)'
   },
   {
    id: '15',
    name: 'Sports director(f)'
   },
   {
    id: '16',
    name: 'Sports director (m) '
   },
   {
    id: '17',
    name: 'Brothers Coordinator'
   },
   {id: '18',
    name: 'Sister Coordinator'
   },
   {
    id: '19',
    name: 'Pre-Degree Coordinator(m)'
   },
   {
    id: '20',
    name: 'Pre-Degree Coordinator(f)'
   },
   {id: '21',
    name: 'Rock Theatre Coordinator'
   },
   {
    id: '22',
    name: 'Crusaders Coordinator'
   },
   {
    id: '23',
    name: 'Team Bethany Leader'
   },
   {id: '24',
    name: 'Team Capernaum Leader'
   },
   {
    id: '25',
    name: 'Team Galilee Leader'
   },
   {
    id: '26',
    name: 'Team Jericho Leader '
   },
   {id: '27',
    name: 'Team Jordan Leader'
   },
   {
    id: '28',
    name: 'Team Nile Leader'
   },
   {
    id: '29',
    name: 'CALSAN President'
   },
   {
    id: '30',
    name: 'FEDCAMDS PRESIDENT'
   }]

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

  getPost(event){
    var value = event.target.value 
    console.log(value)
    this.id_value = value
    var id = this.posts.filter(i => i.id === this.id_value);
    this.post_value = id[0].name
    console.log(id[0].name) 
    // this.excoForm = this.formBuilder.group({
      
    // })
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
            post: this.post_value,
            email: this.excoForm.value.email,
            department: this.excoForm.value.department,
            mobile: this.excoForm.value.mobile,
            number: this.id_value,
            image_url:this.downloadURL
          }
          console.log('payload', payload)
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

