import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { ErrorMessagesEnum } from '@App/Common/Enums/ErrorMessages.Enum';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { FeedbackModels } from '@App/Common/Models/Feedback.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    standalone: true,
    templateUrl: './FeedBackModal.html',
    styleUrls: ['./FeedBackModal.scss'],
    imports: [CommonModule, FormsModule, StarRatingComponent]
})
export class FeedbackModalComponent implements OnInit {
    activeModal = inject(NgbActiveModal);
    Error!: string | null;
    ratingConfirmed: boolean = false;

    @Input() isEdit: string = '';
    @Input() feedback: FeedbackModels.Feedback = new FeedbackModels.Feedback();
    @Input() courseId!: number;

    constructor(
        private HttpService: HttpService,
        private ErrorCodesService: ErrorCodesService,
        private NotifyService: NotifyService
    ) { }

    ngOnInit() {

    }

    onRatingConfirmed() {
        if (!this.feedback.Rating) {
            this.Error = ErrorMessagesEnum.RATING_NULL;
        } else {
            this.ratingConfirmed = true;
            this.Error = null;
        }
    }

    onSubmit() {
        const endpoint = HttpEndPoints.Feedback.addRating;
        if (this.courseId) this.feedback.CourseId = this.courseId;
        this.HttpService.Post<FeedbackModels.Feedback, FeedbackModels.Feedback>(endpoint, this.feedback)
            .subscribe({
                next: data => {
                    this.NotifyService.Success("Success", "Thank For Your Rating");
                    this.ratingConfirmed = false;
                    this.activeModal.close('save');
                },
                error: error => {
                }
            });
    }
}
