import { CourseLevelEnum } from '@App/Common/Enums/CourseLevel.Enum';
import { CourseTypeEnum } from '@App/Common/Enums/CourseType.Enum';
import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { Constants, ConstantsType } from '@App/Common/Settings/Constants';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { CommonModule, NgSwitch } from '@angular/common';
import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { observable } from 'rxjs';

@Component({
    selector: 'ngbd-modal-content',
    standalone: true,
    templateUrl: './DetailsModal.html',
    styleUrls: ['./DetailsModal.scss'],
    imports: [CommonModule, FormsModule, TranslateModule]
})
export class DetailsModalComponent implements OnInit {
    daysOfWeek: ConstantsType[] = Constants.Weekdays;
    SessionMinutes: ConstantsType[] = Constants.MinutesDropDown;
    Today: string = Constants.GetTodayDate();

    activeModal = inject(NgbActiveModal);
    IsDisabled: boolean = false;
    NewClass: CourseModels.Class = new CourseModels.Class();
    NewCourse: CourseModels.Course = new CourseModels.Course();
    CourseFile!: File;
    CourseSampleFile!: File;
    CourseImage!: File;
    ModalPropertyEnum = ModalPropertyEnum;
    DynamicValue: string = '';
    Error!: string;
    DateError!: string;
    ImageProgress: any = { start: 0, end: 100 }
    FileProgress: any = { start: 0, end: 100 }

    // CourseTypeEnum = CourseTypeEnum;
    courseTypes = Object.keys(CourseTypeEnum);
    courseTypesValues = Object.values(CourseTypeEnum);

    courseLevels = Object.keys(CourseLevelEnum);
    courseLevelsValues = Object.values(CourseLevelEnum);

    @Input() property!: ModalPropertyEnum;
    @Input() isEdit: string = '';
    @Input() course: CourseModels.Course = new CourseModels.Course();
    @Input() index: string = '';

    constructor(
        private HttpService: HttpService,
        private AuthService: AuthService,
        private ErrorCodesService: ErrorCodesService,
        private NotifyService: NotifyService
    ) { }

    ngOnInit() {
        this.initCourse();
        this.initClass();
    }

    initCourse() {
        this.NewCourse.Id = this.course.Id;
        this.NewCourse.Name = this.course.Name;
        this.NewCourse.TypeIdString = this.course.TypeIdString;
        this.NewCourse.LevelIdString = this.course.LevelIdString;
        this.NewCourse.Description = this.course.Description;
        this.NewCourse.VideoPath = this.course.VideoPath;
        this.NewCourse.FilePath = this.course.FilePath;
        this.NewCourse.StartDate = Constants.convertDateToYYYYMMDD(new Date(this.course.StartDate));
        this.NewCourse.ImageUrl = this.course.ImageUrl;
        this.NewCourse.Prerequisite = this.course.Prerequisite;
        this.NewCourse.ToBeLearned = this.course.ToBeLearned;
        this.NewCourse.Price = this.course.Price;
        this.NewCourse.PriceBeforeDiscount = this.course.PriceBeforeDiscount;
        this.NewCourse.IsActive = this.course.IsActive;
        this.NewCourse.Classes = this.course.Classes;
        this.NewCourse.MaxStartDate = this.Courses.GetEarliestClassDate(this.course);

        // to get dynamic proprty value
        if (this.index) {
            this.DynamicValue = (this.NewCourse as any)[this.index];
        }
    }

    initClass() {
        this.NewClass.CourseId = this.course.Id;
        const classStartDate = this.NewCourse.StartDate > this.Today ? this.NewCourse.StartDate : this.Today;
        this.NewClass.StartDate = classStartDate;// min start date for a class is course's start date or today's

        if (this.property == ModalPropertyEnum.Class && this.isEdit) {
            this.NewClass.Id = this.course.Classes[+this.index].Id;
            this.NewClass.Name = this.course.Classes[+this.index].Name;
            this.NewClass.NumberOfSessions = this.course.Classes[+this.index].NumberOfSessions;
            this.NewClass.StartDate = Constants.convertDateToYYYYMMDD(new Date(this.course.Classes[+this.index].StartDate));
            this.NewClass.EndDate = this.course.Classes[+this.index].EndDate;
            this.NewClass.MaxCapacity = this.course.Classes[+this.index].MaxCapacity;
            this.NewClass.CurrentIndex = this.course.Classes[+this.index].CurrentIndex;
            this.NewClass.IsActive = this.course.Classes[+this.index].IsActive;
            this.NewClass.HasFreeTrial = this.course.Classes[+this.index].HasFreeTrial;

            this.NewClass.LiveSessions = this.course.Classes[+this.index].LiveSessions;
            this.NewClass.LiveSessions.forEach(sess => {
                sess.StartTimeString = Constants.convertDateToHHMM(new Date(sess.StartDate))
                sess.StartDateString = Constants.convertDateToYYYYMMDD(new Date(sess.StartDate))
            });
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
                    this.Courses.editCourse();
                } else {
                    this.Courses.addCourse();
                }
                break;
            case ModalPropertyEnum.Class:
                if (this.isEdit) {
                    this.Classes.editClass();
                } else {
                    this.Classes.addClass();
                }
                break;
            default:
                this.Courses.editCourse();
                break;
        }
    }

    Courses = {
        GetEarliestClassDate: (course: CourseModels.Course): string => {
            const earliestClassStartDate = course.Classes
                .filter(classItem => classItem.IsActive == true && classItem.IsDeleted == false)
                .reduce((earliest, currentClass) => {
                    if (!earliest || new Date(currentClass.StartDate) < new Date(earliest)) {
                        return currentClass.StartDate;
                    }
                    return earliest;
                }, undefined as string | undefined);
            return Constants.convertDateToYYYYMMDD(new Date(earliestClassStartDate ?? ''));
        },

        addCourse: () => {
            let endPoint = HttpEndPoints.Courses.AddCourse;
            this.IsDisabled = true;
            this.HttpService.Post<CourseModels.Course, CourseModels.Course>(endPoint, this.NewCourse).subscribe({
                next: async data => {
                    this.NewCourse = data;
                    if ((this.CourseFile || this.CourseSampleFile || this.CourseImage)) {
                        await this.Courses.editCourse();
                    }
                    this.IsDisabled = false;
                    this.activeModal.close('save');
                }, error: error => {
                    this.IsDisabled = false;

                }
            })
        },

        editCourse: async () => {
            // console.log(this.NewCourse)
            if (this.index) {
                (this.NewCourse as any)[this.index] = this.DynamicValue;
            }

            let endPoint = HttpEndPoints.Courses.EditCourse;
            endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())
            this.IsDisabled = true;
            if ((this.CourseFile || this.CourseSampleFile || this.CourseImage)) {
                if (this.CourseFile) {
                    await this.uploadFile(HttpEndPoints.Courses.Uploadfile.replace("{IsSample}", "false"), this.CourseFile, false)
                }
                if (this.CourseSampleFile) {
                    await this.uploadFile(HttpEndPoints.Courses.Uploadfile.replace("{IsSample}", "true"), this.CourseSampleFile, false)
                }
                if (this.CourseImage) {
                    await this.uploadFile(HttpEndPoints.Courses.UploadImage, this.CourseImage, true)
                }
            }
            // console.log(this.NewCourse.ImageUrl);

            this.HttpService.Put<CourseModels.Course>(endPoint, this.NewCourse).subscribe({
                next: data => {
                    this.IsDisabled = false;
                    this.activeModal.close('save');
                },
                error: err => {
                    this.IsDisabled = false;
                    this.DateError = this.ErrorCodesService.GetErrorCode(err.error.Message);
                }
            })
        },

        deleteCourse: async () => {
            const confirmed = await this.NotifyService.ConfirmDelete(`"${this.NewCourse.Name}" course`);
            if (!confirmed) return;

            let endPoint = HttpEndPoints.Courses.DeleteCourse;
            endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString())
            this.IsDisabled = true;
            this.HttpService.Delete(endPoint).subscribe(data => {
                this.IsDisabled = false;
                this.activeModal.close('delete');
            })
        },
    }

    Classes = {
        AddNewClassPeriod: () => {
            this.NewClass.Period.push(new CourseModels.PeriodDto());
        },

        onDayChange: (event: any, index: number) => {
            // ngmodel isn't working with dynamic adding in forms
            this.NewClass.Period[index].Day = event.target.value;
        },

        onTimeChange: (event: any, index: number) => {
            if (this.isEdit) {
                let d = new Date(this.NewClass.LiveSessions[index].StartDate);
                const [hours, minutes] = event.target.value.split(":").map(Number);

                // Set the time for the Date object
                d.setHours(hours);
                d.setMinutes(minutes);

                this.NewClass.LiveSessions[index].StartDate = d;
                this.NewClass.LiveSessions[index].StartDateString = Constants.convertDateToYYYYMMDD(d);
                this.NewClass.LiveSessions[index].StartTimeString = event.target.value;
            } else {
                this.NewClass.Period[index].Time = event.target.value;
            }
        },

        onDurationChange: (event: any, index: number) => {
            this.NewClass.Period[index].DurationInMins = event.target.value;
        },

        onLinkChange: (event: any, index: number) => {
            this.NewClass.LiveSessions[index].Link = event.target.value;
        },

        onDateChange: (event: any, index: number) => {
            let selectedDate = new Date(event.target.value);
            const [hours, minutes] = this.NewClass.LiveSessions[index].StartTimeString.split(":").map(Number);

            selectedDate.setHours(hours);
            selectedDate.setMinutes(minutes);

            this.NewClass.LiveSessions[index].StartDate = selectedDate;
            this.NewClass.LiveSessions[index].StartDateString = Constants.convertDateToYYYYMMDD(selectedDate);
        },

        addClass: () => {
            let endPoint = HttpEndPoints.Classes.AddClass;

            this.IsDisabled = true;
            this.HttpService.Post<CourseModels.Class, CourseModels.Class>(endPoint, this.NewClass).subscribe({
                next: data => {
                    this.IsDisabled = false;
                    this.activeModal.close('save');
                }, error: error => {
                    this.IsDisabled = false;

                }
            })
        },

        editClass: () => {
            let endPoint = HttpEndPoints.Classes.EditClass;
            endPoint = endPoint.replace('{id}', this.NewClass.Id.toString())
            this.IsDisabled = true;

            this.HttpService.Put<CourseModels.Class>(endPoint, this.NewClass).subscribe({
                next: data => {
                    this.IsDisabled = false;
                    this.activeModal.close('save');
                }, error: error => {
                    this.IsDisabled = false;
                }
            })
        },

        deleteClass: async () => {
            const confirmed = await this.NotifyService.ConfirmDelete(`"${this.NewClass.Name}" class`);
            if (!confirmed) return;

            let endPoint = HttpEndPoints.Classes.DeleteClass;
            endPoint = endPoint.replace('{id}', this.NewClass.Id.toString())
            this.IsDisabled = true;
            this.HttpService.Delete(endPoint).subscribe(data => {
                this.IsDisabled = false;
                this.activeModal.close('delete');
            })
        }
    }

    onImageChange(event: any) {
        this.CourseImage = event.target.files[0];
    }

    onFileChange(event: any, isSample: boolean = false) {
        if (isSample) {
            this.CourseSampleFile = event.target.files[0];
        } else {
            this.CourseFile = event.target.files[0];
        }
    }

    async uploadFile(endPoint: string, file: File, isImage: boolean): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);

        endPoint = endPoint.replace('{id}', this.NewCourse.Id.toString());

        this.IsDisabled = true;

        return new Promise((resolve, reject) => {
            this.HttpService.PostWithOptions(endPoint, formData, {
                reportProgress: true,
                observe: 'events'
            }).subscribe({
                next: (res: any) => {
                    if (res.type === HttpEventType.Response) {
                        this.IsDisabled = false;
                        let filePath = this.HttpService.ApiUrl + 'courses/' + res.body.filePath.replaceAll('\\', '/');
                        if (isImage) {
                            this.NewCourse.ImageUrl = filePath;
                        } else {
                            if (endPoint.includes('true')) {// the sample file is uploaded
                                this.NewCourse.FreeFilePath = filePath;
                            } else {
                                this.NewCourse.FilePath = filePath;
                            }
                        }
                        resolve();
                    }

                    if (res.type === HttpEventType.UploadProgress) {
                        const progress = Math.round(100 * res.loaded / res.total);
                        if (isImage) {
                            this.ImageProgress.start = progress;
                        } else {
                            this.FileProgress.start = progress;
                        }
                    }
                },
                error: (err) => {
                    this.IsDisabled = false;
                    reject(err);
                }
            });
        });
    }
}
