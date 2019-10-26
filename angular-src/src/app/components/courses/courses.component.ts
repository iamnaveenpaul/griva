import { Component, OnInit,Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from "@angular/router";
import {DOCUMENT} from "@angular/common";

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public postService: PostService) {
  }

  title: string = "";
  address: string = "";
  city: string = "";
  experience: string = "";
  certification: string = "";
  ageGroups: string = "";
  brief: string = "";
  bio: string = "";
  address_bio: string = "";
  education: string = "";
  languages: string = "";
  courses = [];

  @ViewChild('modal') modal:ElementRef;

  editCourse(course:any): any {
    $(this.modal.nativeElement).modal('show');

    this.title = course.title;
    this.address = course.address;
    this.city = course.city;
    this.experience = course.experience;
    this.certification = course.certification;
    this.ageGroups = course.ageGroups;
    this.brief = course.brief;
  }

  saveBio(): void {
  }

  saveCourse(): void {
    this.courses.push({
      title: this.title,
      address: this.address,
      city: this.city,
      experience: this.experience,
      certification: this.certification,
      ageGroups: this.ageGroups,
      brief: this.brief
    })
  }

  clearForm(): void {
    this.title = "";
    this.address = "";
    this.city = "";
    this.experience = "";
    this.certification = "";
    this.ageGroups = "";
    this.brief = "";
  }

  ngOnInit() {
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
