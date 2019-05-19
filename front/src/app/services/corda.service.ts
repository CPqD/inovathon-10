import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class CordaService {

  constructor() { }


createId() {
  return new Promise((resolve, reject) => {
      
    const data = {
      uid: '111.111.111-11',
      pubkey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb9BBgPlK4E/e3mz7HTNto8T51o5s7dsXOPMvB0nTQscaGgYGbzdlXQI9OlWP/kzJu5V38vgTY2tMNyxk9wDx19XGunkeQ0J00awslIiffLMql6wc8cRZo0ocNdC24Z9sS8jLG6F2zq0KuRBKKOPMJGybHZ2YfIDs1qza3X9kSSwIDAQAB',
      name: 'Leandro',
      age: '22',
      message: 'hello word',
      signature: '6e65846ac1c3133522f4ed0614c9f26fc4ac21c577a6b3eeeb14ca865d6656a08f10fa2186f6973109323f44631dd187e254ef411ee70af0ee40365ec045a3fe8e84e0eaba14514ec4b3f755f91067e4060190a7529efd366fd53af85a250aa209c779a7c78ef834b193dbdae91096731347da6b7ef8a8df61050a39a3ca104'
    };

      $.ajax({
          url: "http://localhost:12002/api/id/create",
          type: 'POST',
          crossDomain: true,
          headers: {
              'content-type': 'application/json',
          },
          data: JSON.stringify(data),
          success: function (response) {
              return resolve(response);
          }
      }).fail(function (jqXHR, textStatus, err) {
          console.log('Status: ', textStatus);
          console.log('Error: ', err);
          console.log('Message: ', jqXHR.responseText);
          let message: string = jqXHR.responseText;
          if (message.indexOf('Failed requirement:') >= 0) {
              // tslint:disable-next-line:max-line-length
              message = message.substring(message.indexOf('Failed requirement:') + 20, message.indexOf(',', message.indexOf('Failed requirement:')));
          }
          return reject(message);
      });
  });
}


getId() {
  return new Promise((resolve, reject) => {
      
    const data = {};

      $.ajax({
          url: "http://localhost:12002/api/id/all",
          type: 'POST',
          crossDomain: true,
          headers: {
              'content-type': 'application/json',
          },
          data: JSON.stringify(data),
          success: function (response) {
              return resolve(response);
          }
      }).fail(function (jqXHR, textStatus, err) {
          console.log('Status: ', textStatus);
          console.log('Error: ', err);
          console.log('Message: ', jqXHR.responseText);
          let message: string = jqXHR.responseText;
          if (message.indexOf('Failed requirement:') >= 0) {
              // tslint:disable-next-line:max-line-length
              message = message.substring(message.indexOf('Failed requirement:') + 20, message.indexOf(',', message.indexOf('Failed requirement:')));
          }
          return reject(message);
      });
  });
}

}

