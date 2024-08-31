import { Injectable } from '@angular/core';
import {
	Plugins,
	PushNotification,
	PushNotificationToken,
	PushNotificationActionPerformed,
	Capacitor,
	NotificationChannel,
} from '@capacitor/core';
import { Router } from '@angular/router';

const configPush = {
	apiKey: 'AIzaSyCWAfFBSItox0STVT125Y61JGZzuMjsCII',
	authDomain: 'mein24.firebaseapp.com',
	databaseURL: 'https://mein24.firebaseio.com',
	projectId: 'mein24',
	storageBucket: 'mein24.appspot.com',
	messagingSenderId: '809034767157',
	appId: '1:809034767157:web:c534c87169196f54e40a7c',
	measurementId: 'G-Y0X1MQ1EFG',
};

const { PushNotifications } = Plugins;

@Injectable({
	providedIn: 'root',
})
export class FcmService {
	notifChn: NotificationChannel;
	constructor(private router: Router) {}

	initPush() {
		if (Capacitor.platform !== 'web') {
			this.registerPush();
		}
	}

	private registerPush() {
		PushNotifications.requestPermission().then((permission) => {
			if (permission.granted) {
				// this.notifChn.id
				// PushNotifications.createChannel(this.notifChn)
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			} else {
				// No permission for push granted
			}
		});

		PushNotifications.addListener('registration', (token: PushNotificationToken) => {
			console.log('My token: ' + JSON.stringify(token));
		});

		PushNotifications.addListener('registrationError', (error: any) => {
			console.log('Error: ' + JSON.stringify(error));
		});

		PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
			console.log('Push received: ' + JSON.stringify(notification));
		});

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			async (notification: PushNotificationActionPerformed) => {
				const data = notification.notification.data;
				console.log('Action performed: ' + JSON.stringify(notification.notification));
				if (data.detailsId) {
					this.router.navigateByUrl(`/home/${data.detailsId}`);
				}
			}
		);
	}
}
