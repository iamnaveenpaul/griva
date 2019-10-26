import { Component, OnInit, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'admin-root',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  constructor(
    public postService: PostService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) {}

  allPosts = [];
  superList = this.postService.superList;

  ngOnInit() {

    const loadQuill = this.renderer2.createElement('script');
    loadQuill.type = 'text/javascript';
    loadQuill.src = 'assets/loadQuill.js';
    loadQuill.text = ``;

    this.renderer2.appendChild(this._document.body, loadQuill);

    this.postService.getPosts().subscribe(
      data => {
        data.forEach((el) => {
          el.date = formatDate(new Date(el.date))
          el.categoriesFlat = el.categories.join(",");
          el.formattedUrl = "/academy/"+el.url;
          this.allPosts.push(el);
        });

        this.allPosts = data;
      },
      err => {
        console.log(err);
        return false;
      }
    );

  };

  academy:string = this.superList[0].name;
  tags: string = '';
  title: string = 'Bam! An eye catching header to set your readers heart racing!';
  subtitle: string = 'An equally exciting subtitle sets up the tone of your post...';
  public showAlert: boolean = false;
  public noError: boolean = false;
  public alertMessage: string = '';
  activeSection: string = 'posts';

  onSave(): void {
    var post = {
      userEmailId: "",
      title: this.title,
      subtitle: this.subtitle,
      text: document.querySelector(".ql-editor").innerHTML,
      date: new Date(),
      academy:this.academy,
      categories: this.tags.length>0?this.tags.split(","):[]
    }

    if(this.title && this.title.length>0){
    } else {
      this.showAlert = true;
      this.noError = true;
      this.alertMessage = "Title can not be empty";
      this.closeAlerts(this);
    }

    if(post.categories && post.categories.length>0){
    } else {
      this.showAlert = true;
      this.noError = true;
      this.alertMessage = "Please select at least one tag";
      this.closeAlerts(this);
    }

    if(!this.noError){
      this.postService.savePost(post).subscribe(data => {
        if (data.success == true) {
          this.showAlert = true;
          this.alertMessage = "Post published successfully!";
        } else {
          this.showAlert = true;
          this.alertMessage = data.msg;
        }

        this.closeAlerts(this);
      });
    }
  }

  closeAlerts(that){
    setTimeout(function() {
      that.showAlert = false;
      that.alertMessage = '';
    }, 2000);
  }
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
