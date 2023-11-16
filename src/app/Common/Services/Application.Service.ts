import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
	Version: BehaviorSubject<string> = new BehaviorSubject(environment.version);
	constructor() { }
}
