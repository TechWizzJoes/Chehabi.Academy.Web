import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

interface Env {
	Web: string;
	ApiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfig {
	env!: Env;
	hostname: string = window.location.hostname;

	ApiUrl: Subject<string> = new Subject();

	constructor(private HttpClient: HttpClient) { }

	async LoadAppConfig() {
		// console.log('Client: ' + this.hostname);
		this.HttpClient.get<Env[]>('assets/Config/Env.json').subscribe((envArray) => {
			this.env = envArray.find((env) => env.Web == this.hostname)!;
			// console.log('env: ', { ...this.env });
			this.ApiUrl.next(this.env.ApiUrl);
		});
	}
}
