import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService) {}

  courseList = [{
    image: { background: "url(assets/img/examprep.jpg) no-repeat center center" },
    type: "Exam Prep",
    list:["UGC coaching", "UPSC coaching", "IIT JEE coaching", "IELTS coaching", "IBPS coaching"]
  },{
    image: { background: "url(assets/img/tuitions.jpg) no-repeat center center" },
    type: "Tuitions",
    list:["Class 1-5 tuitions", "Class 6-8 tuitions", "Class 9 tuitions", "Class 10 tuitions", "Class 11 tuitions", "Class 12 tuitions"]
  },{
    image: { background: "url(assets/img/itcourse.jpg) no-repeat center center" },
    type: "IT Courses/Training",
    list:["Java training","Python training","C++ Language training","MS Excel training","Database training","Angular JS training"]
  },{
    image: { background: "url(assets/img/language.jpg) no-repeat center center" },
    type: "Languages",
    list:["French Language","Spanish Language","Mandarin Language","Hindi Language","English Language"]
  },{
    image: { background: "url(assets/img/music.jpg) no-repeat center center" },
    type: "Music",
    list:["Learn Guitar","Carnatic Music","Hindustani Music", "Keyboard", "Piano", "Singing", "Tabla"]
  },{
    image: { background: "url(assets/img/dance.jpg) no-repeat center center" },
    type: "Dance",
    list:["Bollywood","Kathak", "Ballet", "Bharatanatyam","Hip Hop","Choreography"]
  }];

  ngOnInit() {}
}
