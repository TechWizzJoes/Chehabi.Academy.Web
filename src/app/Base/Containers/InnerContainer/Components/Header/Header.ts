import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss']
})
export class HeaderComponent {

	constructor() {
		window.addEventListener("scroll", function () {
			const navbar = document.querySelector(".navbar");
			if (window.scrollY > 56) {
				navbar!.classList.add("navbar-scrolled");
			} else {
				navbar!.classList.remove("navbar-scrolled");
			}
		});
	}
}
