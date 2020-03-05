import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services/dashboard.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  DataBlogs:any[] = [];
  isLoadingBlogs;
  isDataBlogs;
  constructor(private dashboard:DashboardService) { }

  ngOnInit() {
    console.log('got here ')
    this.getBlogs();
  }

  async  getBlogs() {
    this.isLoadingBlogs = true;
    this.isDataBlogs = false;
    await this.dashboard.getBlogs().subscribe(blogs => {
      this.isLoadingBlogs = false
      this.isDataBlogs = true
      this.DataBlogs = blogs.blogs;
      console.log('recent blogs', blogs);

    }, error => {
      this.isLoadingBlogs = false
      this.isDataBlogs = false;
      console.log('error: ', error.error.statusText);
    });
  }

}