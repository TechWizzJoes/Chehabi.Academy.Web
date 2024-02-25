import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { CommonModule, NgSwitch } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    standalone: true,
    templateUrl: './DetailsModal.html',
    styleUrls: ['./DetailsModal.scss'],
    imports: [CommonModule, FormsModule]
})
export class DetailsModalComponent implements OnInit {
    activeModal = inject(NgbActiveModal);
    IsDisabled: boolean = false;
    NewClass: CourseModels.Class = new CourseModels.Class();
    NewCourse: CourseModels.Course = new CourseModels.Course();
    ModalPropertyEnum = ModalPropertyEnum;
    DynamicValue: string = '';

    @Input() property!: ModalPropertyEnum;
    @Input() isEdit: string = '';
    @Input() course: CourseModels.Course = new CourseModels.Course();
    @Input() index: string = '';

    constructor(private HttpService: HttpService) { }

    ngOnInit() {
        this.initCourse();
        if (this.property == ModalPropertyEnum.Class && this.isEdit) {
            this.initClass();
        }
    }

    initCourse() {
        this.NewCourse.Id = this.course.Id;
        this.NewCourse.Name = this.course.Name;
        this.NewCourse.Description = this.course.Description;
        this.NewCourse.VideoPath = this.course.VideoPath;
        this.NewCourse.FilePath = this.course.FilePath;
        this.NewCourse.StartDate = this.course.StartDate;
        this.NewCourse.ImageUrl = this.course.ImageUrl;
        this.NewCourse.Prerequisite = this.course.Prerequisite;
        this.NewCourse.ToBeLearned = this.course.ToBeLearned;
        this.NewCourse.Price = this.course.Price;

        // to get dynamic proprty value
        if (this.index) {
            this.DynamicValue = (this.NewCourse as any)[this.index];
        }
    }

    initClass() {
        this.NewClass.CourseId = this.course.Id;
        this.NewClass.StartDate = this.course.Classes[+this.index].StartDate;
        this.NewClass.EndDate = this.course.Classes[+this.index].EndDate;
        this.NewClass.MaxCapacity = this.course.Classes[+this.index].MaxCapacity;
        this.NewClass.Period = this.course.Classes[+this.index].Period;
        this.NewClass.CurrentIndex = this.course.Classes[+this.index].CurrentIndex;
    }

    saveChanges() {
        switch (this.property) {
            case ModalPropertyEnum.Course:
                if (this.isEdit) {
                    this.editCourse();
                } else {
                    this.addCourse();
                }
                break;
            case ModalPropertyEnum.Class:
                if (this.isEdit) {
                    this.editClass();
                } else {
                    this.addClass();
                }
                break;
            default:
                this.editCourse();
                break;
        }
    }

    addCourse() {
        let endPoint = HttpEndPoints.Courses.AddCourse;
        this.IsDisabled = true;
        this.HttpService.Post<CourseModels.Course, CourseModels.Course>(endPoint, this.NewCourse).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    editCourse() {
        if (this.index) {
            (this.NewCourse as any)[this.index] = this.DynamicValue;
        }
        let endPoint = HttpEndPoints.Courses.EditCourse;
        endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())
        this.IsDisabled = true;
        this.HttpService.Put<CourseModels.Course>(endPoint, this.NewCourse).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    addClass() {
        let endPoint = HttpEndPoints.Classes.AddClass;
        this.IsDisabled = true;
        this.HttpService.Post<CourseModels.Class, CourseModels.Class>(endPoint, this.NewClass).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    editClass() {
        let endPoint = HttpEndPoints.Classes.EditClass;
        endPoint = endPoint.replace('{id}', this.NewClass.Id.toString())
        this.IsDisabled = true;
        this.HttpService.Put<CourseModels.Class>(endPoint, this.NewClass).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }
}
