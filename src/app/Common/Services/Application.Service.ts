import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
	Version: BehaviorSubject<string> = new BehaviorSubject('0.0.16');
	constructor() { }
}
