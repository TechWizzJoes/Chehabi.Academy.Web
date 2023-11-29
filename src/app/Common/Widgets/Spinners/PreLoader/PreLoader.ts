import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../Loader/Loader';


@Component({
    selector: 'app-preloader',
    standalone: true,
    templateUrl: './PreLoader.html',
    styleUrls: ['PreLoader.scss'],
    imports: [LoaderComponent]
})
export class PreLoaderComponent implements OnInit {
    constructor(
    ) { }

    ngOnInit() { }
}
