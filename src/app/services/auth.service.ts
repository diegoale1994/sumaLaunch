import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import * as OAuth from 'oauth-1.0a';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthObject: any;
constructor(private httpClient: HttpClient) { 

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

consumerKey = 'rNFHVnNLjQ5W8jq2';
consumerSecret = 'fbwaVyvFCnmhEb5y';
baseUrl = 'https://icfes-test.sumadi.net/lti/v1';
callback = 'http://localhost:4200/';
signature_method = 'HMAC-SHA1';
timestamp = Math.floor(Date.now() / 1000); // Timestamp in Second
//signature = CryptoJS.HmacSHA1(this.consumerSecret, this.consumerKey);
nonce = Math.random();
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  })
};

initiate(params) {
  debugger
  console.log(params)


const token = {
  key: this.consumerKey,
  secret: this.consumerSecret,
}
 const authorization = this.oauthObject.authorize({url: this.baseUrl, method: 'POST'});
 Object.assign(params, authorization);

 const request_data = {
  url: 'https://icfes-test.sumadi.net/lti/v1',
  method: 'POST',
  data: params
} 
  return this.httpClient.post(this.baseUrl, this.oauthObject.authorize(request_data, token), this.httpOptions)
}

}
