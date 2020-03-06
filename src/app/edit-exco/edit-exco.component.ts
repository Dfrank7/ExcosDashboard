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
  id_value;
  post_value;
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
      file: ['', Validators.compose([Validators.required])]
    });

    this.data = this.router.getCurrentNavigation().extras.state;
    if (this.data == null) {
      this.router.navigateByUrl('dashboard')
    }
    this.excoForm.controls['name'].setValue(this.data.name);
    this.excoForm.controls['post'].setValue(this.data.post);
    console.log('okkk',this.data.post)
    this.excoForm.controls['email'].setValue(this.data.email);
    this.excoForm.controls['department'].setValue(this.data.department);
    this.excoForm.controls['mobile'].setValue(this.data.mobile);
    // this.excoForm.controls['number'].setValue(this.data.number);
    // this.excoForm.controls['image_url'].setValue(this.data.image_url);

    this.image_url = this.data.image_url;
    this.id = this.data._id;
  }

  ngOnInit() {

  }

  getPost(event){
    var value = event.target.value 
    console.log(value)
    this.data.number = value
    var id = this.posts.filter(i => i.id === this.data.number);
    this.data.post = id[0].name
    console.log('okkPost',id)   
    // this.excoForm = this.formBuilder.group({
      
    // })
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
      post: this.data.post,
      email: this.excoForm.value.email,
      department: this.excoForm.value.department,
      mobile: this.excoForm.value.mobile,
      number: this.data.number,
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
