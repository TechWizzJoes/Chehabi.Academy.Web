import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'outer-container',
	template: ` <router-outlet></router-outlet> `
})
export class OuterContainer implements OnInit {
	constructor() { }
	ngOnInit(): void { }
}
