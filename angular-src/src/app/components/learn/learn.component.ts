import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public postService: PostService) {
  }

  latestPosts = [{
    url:"guitar",
    name:"guitar"
  },{
    url:"technology",
    name:"technology"
  },{
    url:"lyrics",
    name:"lyrics"
  },{
    url:"javascript",
    name:"javascript"
  },{
    url:"guitar",
    name:"guitar"
  }];

  jumbo = {};

  superList = this.postService.superList;;

  heroPostsOne = [];
  heroPostsTwo = [];

  fetchSecondaryPosts() {
    this.postService.getHeroPosts().subscribe(
      data => {

        data.forEach((el) => {
          el.img = this.postService.extractImgFromPost(el.text);
          if(el.img){
            this.jumbo = el;
          }

          el.author = "qwerty";

          el.date = formatDate(new Date(el.date));
          el.formattedUrl = this.postService.apiUrl_public+"/academy/"+el.url;
        });

        this.heroPostsOne = data;
        this.heroPostsTwo = data;

      },
      err => {
        console.log(err);
        return false;
      });
  }

  ngOnInit() {
    this.fetchSecondaryPosts();
  }
}

function formatDate(date) {
  var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getDate() + " " + monthNames[date.getMonth()] +" " + date.getFullYear();
};
