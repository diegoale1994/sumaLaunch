import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './services/auth.service';
import * as OAuth from 'oauth-1.0a';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  oauthObject: any;
  url = 'https://icfes-test.sumadi.net/lti/v1/echo';
  consumerKey = 'rNFHVnNLjQ5W8jq2';
  consumerSecret = 'fbwaVyvFCnmhEb5y';
  callback = 'http://localhost:4200/';
  signature_method = 'HMAC-SHA1';
  timestamp = Math.floor(Date.now() / 1000); // Timestamp in Second
  nonce = Math.random();
  params: any;

  constructor(private _authService: AuthService) {
    this.oauthObject = new OAuth({
      consumer: {
          key: 'rNFHVnNLjQ5W8jq2',
          secret: 'fbwaVyvFCnmhEb5y'
      },
      signature_method: 'HMAC-SHA1',
      hash_function: function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
      }
  });
  }


  ngOnInit(): void {
    this.params = {
      // LTI Required Parameters
      "lti_version": 'LTI-1p0',
      "lti_message_type": "basic_lti-launch-request",
      // OAuth 1.0a Required Parameters
      /* "oauth_consumer_key": this.consumerKey,
      "oauth_nonce": btoa(this.timestamp + ''),
      "oauth_signature_method": this.signature_method,
      "oauth_timestamp": this.timestamp + '',
      "oauth_version": '1.0',
      "oauth_consumer_secret": this.consumerSecret,
      "oauth_signature": '', */
      "tool_consumer_info_product_family_code": 'Plexi',
      "lis_person_sourcedid": 'JhonDoe',
      "lis_person_name_given": 'Jhon',
      "lis_person_name_family": 'Doe',
      "lis_person_name_full": 'JhonDoe',
      "resource_link_id": '20',
      "custom_user_locale": 'es_ES',
      "custom_user_role": 'E',
      "custom_user_id": 234666,
      "custom_course_id": 1234321,
      "custom_course_name": 'PlexiTestCourse',
      "custom_course_role": 'NONE',
      "custom_course_locale": 'es_ES',
      "custom_account_id": '6006092c794cfc68bcaba0db', // •	Account Id from mail
      "custom_redirect_url": 'http://localhost:4200/'
    };

    const authorization = this.oauthObject.authorize({url: this.url, method: 'POST'});

    Object.assign(this.params, authorization);

  /*   let url = `POST&${this.url}`;

    for (let [key, value] of Object.entries(this.params)) {
     url = url + `&${key}=${value}`;
  } */


    //this.params.oauth_signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(url, this.consumerSecret));

    const form = document.querySelector("#ltiForm") as any;
    for (var name in this.params) {
      var node = document.createElement("input");
      node.name = name;
      node.type = 'hidden';
      node.value = this.params[name];
      form.appendChild(node);
    }

  }


  integrate() {
    this._authService.initiate(this.params).subscribe(r => {
      console.log(r);
    })
  }



}
