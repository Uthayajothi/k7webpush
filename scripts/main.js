/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BAX0twVAhj6X24wQOtGYToTkiMMWP_R6FpuPdyea22doRDglkcEYOsMGbdusdeA-icv8DjziaJPL-YKTr4MKh40';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed.');

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push are supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function initializeUI() {
  // Set the initial subscription value
  
pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
		unsubscribeUser();
	  } else {
		subscribeUser();
	  }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initializeUI();
})

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
	  
	  var requestOptions = {
	  method: 'POST',
	  redirect: 'follow'
	};

	fetch("https://552-ezz-853.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=78ba623d-4ed0-49c0-b65f-f4ae97156872&client_secret=FUPpEe1hwxKJMQwdwixCI5M7QptrHbWb", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
	  
	  var accessToken = 
	  
	alert("hi");
	var tokenData = {
"client_id": "78ba623d-4ed0-49c0-b65f-f4ae97156872",
"client_secret": "FUPpEe1hwxKJMQwdwixCI5M7QptrHbWb",
"grant_type": "client_credentials"
};
	
	var options = { 
		method: decodeURIComponent('POST'),
		url: 'https://552-ezz-853.mktorest.com/identity/oauth/token',
		headers: { 'content-type': 'application/json'},
		body: JSON.stringify(tokenData) 
	};

	request(options, function (error, response, body) {
		
		var accessToken = response.access_token;
		
		console.log(accessToken);
		
		if (accessToken != '' || accessToken != null) {
			var data = {"action":"createOrUpdate","input":[{"webbrowserID":subscriptionJson.textContent}}]};
			var options = { 
				method: decodeURIComponent('POST'),
				url: 'https://552-ezz-853.mktorest.com/rest/v1/leads.json',
				headers: { 
					"content-type": "application/json",
					"Authorization": "Bearer " + accessToken,
					
				},
				body: JSON.stringify(data) 
			};

			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				console.log(body);
			});
		} else if (error) throw new Error(error);
		
		console.log(body);
	});
	  
	  
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function unsubscribeUser() {
 swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
}
