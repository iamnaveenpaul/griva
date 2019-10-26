import { Component, OnInit,Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import {DOCUMENT, PlatformLocation } from "@angular/common";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss'],
})
export class AcademyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public postService: PostService,
    private renderer2: Renderer2,
    private pageTitle: Title,
    @Inject(DOCUMENT) private _document) {}

  title: string = "";
  views: number = 0;
  author: string = 'Naveen Paul';
  date: string = '';
  academy: string = '';
  categories = [];
  loadAcademy: boolean = false;

  superList = this.postService.superList;

  allPosts =[];

  onScrollDown() {
    console.log('down!!');
    this.getAcademicPosts();
  }

  onScrollUp() {
    console.log('up!!');
  }

  getAcademicPosts() {

    this.postService.getLatestPostByAcademy(this.academy).subscribe(
      data => {
        console.log(data);
        data.forEach((el) => {
          el.img = this.postService.extractImgFromPost(el.text);
          el.no_imgcss = getColor();
          el.author = "qwerty";
          el.date = formatDate(new Date(el.date));
          el.formattedUrl = this.postService.apiUrl_public+"/"+el.url;
          el.subtitle = "We need to show them (potential investors) how everything functions at the transistor level,” our VP Engineering, “John”, said to me.";

          this.allPosts.push(el);
        });
      },
      err => {
        console.log(err);
        return false;
      });
  }

  loadThePage(){
    var title = this.route.snapshot.paramMap.get("id");

    console.log("Title", title);
    
    this.academy = title;
    this.pageTitle.setTitle(capitalizeFirstLetter(title));

    this.superList.forEach(function(el){
      if(title == el.url){
        this.loadAcademy = true;
      }
    }.bind(this));

    this.getAcademicPosts();
  }

  ngOnInit() {
    this.loadThePage();
  }

  @ViewChild('postsls') dataContainer: ElementRef;
}

function getColor(){
  return '#'+Math.random().toString(16).substr(-6);
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
