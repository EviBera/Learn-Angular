import { Component, Input, OnChanges } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number = 0;
    cropWidth: number = 75;

    ngOnChanges(): void {
        console.log('Current rating:', this.rating);
        this.cropWidth = this.rating * 75/5;
        console.log('Calculated cropWidth:', this.cropWidth);
    }

    onClick(): void {
        console.log(`The rating ${this.rating} was clicked!`);
    }
}