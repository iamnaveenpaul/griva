import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

const BASE_URL = environment.backendUrl;

@Injectable()
export class PostService {
  private authToken: string;
  private user: string;

  private apiUrl: string = `${BASE_URL}`+'/post';
  public apiUrl_public: string = `${BASE_URL}`+'/post';

  superList = [{
    url:"technology",
    name:"technology"
  },{
    url:"javascript",
    name:"javascript"
  },{
    url:"java",
    name:"java"
  },{
    url:"civil-services",
    name:"civil services"
  },{
    url:"entrepreneurship",
    name:"entrepreneurship"
  }];

  constructor(public http: Http) {}

  savePost(data): any {
    let url: string = this.apiUrl + '/save';
    this.loadCredentials();

    // prepare the request
    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });

    let options = new RequestOptions({ headers: headers });
    let reqBody = data;

    // POST
    let observableReq = this.http
      .post(url, reqBody, options)
      .map(this.extractData);

    return observableReq;
  }

  loadCredentials(): void {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    this.authToken = token;
    this.user = user;
  }

  getPosts(): any {
    let url: string = this.apiUrl + '/get/all';
    this.loadCredentials();

    // prepare the request
    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });

    let options = new RequestOptions({ headers: headers });
    let observableReq = this.http.get(url, options).map(this.extractData);

    return observableReq;
  }

  getPostByTitle(title): any {
    let url: string = this.apiUrl + '/academy/articles/'+title;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    let observableReq = this.http.get(url, options).map(this.extractData);

    return observableReq;
  }

  getLatestPostByAcademy(title): any {
    let url: string = this.apiUrl + '/academy?academy='+title;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    let observableReq = this.http.get(url, options).map(this.extractData);

    return observableReq;
  }

  getHeroPosts(): any {
    let url: string = this.apiUrl + '/academy/hero';
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });
    let observableReq = this.http.get(url, options).map(this.extractData);

    return observableReq;
  }

  extractImgFromPost(str): any{
    var imgExists = str.indexOf('<img src="');

    if (imgExists > -1) {
      var i = imgExists + 10;
      str = str.substr(i);
      str = str.substr(0, str.indexOf('"'));
      return str;
    } else {
      return null;
    }
  }

  extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }
}
