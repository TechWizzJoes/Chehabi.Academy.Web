import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-loader',
    standalone: true,
    templateUrl: './Loader.html',
    styleUrls: ['Loader.scss'],
    imports: [CommonModule]
})
export class LoaderComponent implements OnInit {
    @Input('Size') Size: number = 4;

    constructor() { }

    ngOnInit() { }
}
