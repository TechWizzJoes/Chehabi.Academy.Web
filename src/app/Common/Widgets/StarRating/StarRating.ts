import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'app-StarRating',
    standalone: true,
    templateUrl: './StarRating.html',
    styleUrls: ['StarRating.scss'],
    imports: [CommonModule]
})
export class StarRatingComponent implements OnInit {
    @Input('ReadOnly') ReadOnly!: boolean;

    @Input('Rate') Rate!: number;
    @Output('RateChange') RateChange: EventEmitter<number> = new EventEmitter<number>();

    hoveredRate: number = 0; // Variable to track hovered index

    constructor() { }

    ngOnInit() { }

    changeRating(event: Event, index: number) {
        if (this.ReadOnly) return
        event.stopPropagation();
        event.preventDefault();
        this.Rate = index;
        this.RateChange.emit(index);
    }

    // Handle mouse enter to highlight stars
    onMouseEnter(index: number) {
        if (this.ReadOnly) return
        this.hoveredRate = index;
    }

    // Reset the highlight when mouse leaves
    onMouseLeave() {
        if (this.ReadOnly) return
        this.hoveredRate = 0;
    }

    // Method to get the color of the stars based on hover or rate
    getStarColor(index: number): string {
        const displayRate = this.hoveredRate || this.Rate;
        return Math.ceil(displayRate) >= index ? 'orange' : 'gray';
    }

    // Method to handle fractional stars (e.g., 3.5 stars)
    getClipPath(index: number): string {
        const displayRate = this.hoveredRate || this.Rate;
        if (index <= Math.floor(displayRate)) {
            return 'none'; // Full star
        } else if (index - 1 < displayRate && displayRate % 1 !== 0) {
            const percent = (((displayRate % 1) * 100) - 100) * -1 // 3.25 -> .25 -> 25 -> -75 -> 75 (as inset do it reversed) 
            return `inset(0 ${percent}% 0 0)`; // Half star for fractional ratings
        } else {
            return 'none'; // Empty star
        }
    }
}
