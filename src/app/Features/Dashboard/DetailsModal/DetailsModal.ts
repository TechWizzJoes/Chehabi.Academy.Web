import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { CommonModule, NgSwitch } from '@angular/common';
import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { observable } from 'rxjs';

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
    CourseFile!: File;
    CourseImage!: File;
    ModalPropertyEnum = ModalPropertyEnum;
    DynamicValue: string = '';
    Error!: string;
    ImageProgress: any = { start: 0, end: 100 }
    FileProgress: any = { start: 0, end: 100 }


    @Input() property!: ModalPropertyEnum;
    @Input() isEdit: string = '';
    @Input() course: CourseModels.Course = new CourseModels.Course();
    @Input() index: string = '';

    constructor(private HttpService: HttpService, private AuthService: AuthService) { }

    ngOnInit() {
        this.initCourse();
        this.initClass();

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
        this.NewCourse.IsActive = this.course.IsActive;

        // to get dynamic proprty value
        if (this.index) {
            this.DynamicValue = (this.NewCourse as any)[this.index];
        }
    }

    initClass() {
        this.NewClass.CourseId = this.course.Id;
        if (this.property == ModalPropertyEnum.Class && this.isEdit) {
            this.NewClass.Id = this.course.Classes[+this.index].Id;
            this.NewClass.StartDate = this.course.Classes[+this.index].StartDate;
            this.NewClass.EndDate = this.course.Classes[+this.index].EndDate;
            this.NewClass.MaxCapacity = this.course.Classes[+this.index].MaxCapacity;
            this.NewClass.Period = this.course.Classes[+this.index].Period;
            this.NewClass.CurrentIndex = this.course.Classes[+this.index].CurrentIndex;
            this.NewClass.IsActive = this.course.Classes[+this.index].IsActive;
        }
    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            this.Error = ErrorCodesEnum.FILL_REQUIRED_FIELDS;
            return;
        }
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
        this.NewCourse.InstructorId = this.AuthService.CurrentUser.Id;
        this.IsDisabled = true;
        this.HttpService.Post<CourseModels.Course, CourseModels.Course>(endPoint, this.NewCourse).subscribe(async data => {
            this.NewCourse = data;
            if ((this.CourseFile || this.CourseImage)) {
                await this.editCourse();
            }
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    async editCourse() {
        console.log(this.NewCourse)
        if (this.index) {
            (this.NewCourse as any)[this.index] = this.DynamicValue;
        }

        let endPoint = HttpEndPoints.Courses.EditCourse;
        endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())
        this.IsDisabled = true;
        if ((this.CourseFile || this.CourseImage)) {
            if (this.CourseFile) {
                await this.uploadFile(HttpEndPoints.Courses.Uploadfile, this.CourseFile, false)
            }

            if (this.CourseImage) {
                await this.uploadFile(HttpEndPoints.Courses.UploadImage, this.CourseImage, true)
            }
        }
        console.log(this.NewCourse.ImageUrl);

        this.HttpService.Put<CourseModels.Course>(endPoint, this.NewCourse).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    deleteCourse() {
        let endPoint = HttpEndPoints.Courses.DeleteCourse;
        endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())
        this.IsDisabled = true;
        this.HttpService.Delete(endPoint).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('delete');
        })
    }

    addClass() {
        debugger
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

    deleteClass() {
        let endPoint = HttpEndPoints.Classes.DeleteClass;
        endPoint = endPoint.replace('{id}', this.NewClass.Id.toString())
        this.IsDisabled = true;
        this.HttpService.Delete(endPoint).subscribe(data => {
            this.IsDisabled = false;
            this.activeModal.close('save');
        })
    }

    onFileChange(event: any, isImage: boolean = true) {

        if (isImage) {
            this.CourseImage = event.target.files[0];

        } else {
            this.CourseFile = event.target.files[0];
        }

    }

    async uploadFile(endPoint: string, file: File, isImage: boolean) {
        const formData = new FormData();
        formData.append('file', file);

        endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())


        this.IsDisabled = true;
        this.HttpService.PostWithOptions(endPoint, formData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe((res: any) => {

            if (res.type === HttpEventType.Response) {
                this.IsDisabled = false;
                let filePath = this.HttpService.ApiUrl + 'courses/' + res.body.filePath.replaceAll('\\', '/');
                if (isImage) {
                    this.NewCourse.ImageUrl = filePath;
                    console.log(this.NewCourse);
                } else {
                    this.NewCourse.FilePath = filePath;
                }
            }
            if (res.type === HttpEventType.UploadProgress) {
                if (isImage) {
                    this.ImageProgress.start = Math.round(100 * res.loaded / res.total);
                } else {
                    this.FileProgress.start = Math.round(100 * res.loaded / res.total);
                }
            }

        })
    }
}
