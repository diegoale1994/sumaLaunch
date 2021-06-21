import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httpClient: HttpClient) { }

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
/*   const request_data = {
    url: 'https://icfes-test.sumadi.net/lti/v1',
    method: 'POST',
    data: params
} */
  return this.httpClient.post(this.baseUrl, params, this.httpOptions)
}

}
