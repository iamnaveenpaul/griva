import { Component, OnInit,Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public postService: PostService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) {
  }

  title: string = "";
  views: number = 0;
  author: string = 'Naveen Paul';
  date: string = '';
  categories = [];

  ngOnInit() {
    var title = this.route.snapshot.paramMap.get("id")

    this.postService.getPostByTitle(title).subscribe(
      data => {
        console.log(data);
        if(data && data.text){
          this.categories = data.categories;
          this.title = data.title;
          this.views = data.views;
          this.author = data.author?data.author:this.author;
          this.date = formatDate(new Date(data.date));

          this.dataContainer.nativeElement.innerHTML = data.text;
        }
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  @ViewChild('postsls') dataContainer: ElementRef;
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getDate() + "-" + (date.getMonth()+1) +"-" + date.getFullYear() + "  " + strTime;
};
