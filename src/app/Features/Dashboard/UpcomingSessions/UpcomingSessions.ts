import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { MessagesEnum } from '@App/Common/Enums/Messages.Enum';
import { Constants } from '@App/Common/Settings/Constants';
import { CartModels } from '@App/Common/Models/Cart.Models';
import { CartService } from '@App/Common/Services/cart.service';

@Component({
    standalone: true,
    templateUrl: './UpcomingSessions.html',
    styleUrls: ['UpcomingSessions.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent, TranslateModule],
})
export class UpcomingSessionsComponent implements OnInit {

    RoutePaths = RoutePaths;
    IsLoaded: boolean = false;

    currentUser!: AuthModels.CurrentUserResModel;
    UpcomingSessions: CourseModels.LiveSession[] = [];

    readonly Blocked: string = 'blocked';
    constructor(
        private AuthService: AuthService,
        private HttpService: HttpService,
        private NotifyService: NotifyService,
        private CartService: CartService,
    ) {
        this.currentUser = this.AuthService.CurrentUser;
    }

    ngOnInit() {
        this.getUserClasses();
    }

    getUserClasses() {
        let endPoint = HttpEndPoints.Sessions.GetUpcoming;
        this.HttpService.Get<CourseModels.LiveSession[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.UpcomingSessions = data;
        })
    }

    async copyLink(sessionLink: string) {
        const copied = await Constants.copyToClipboard(sessionLink);
        if (copied)
            this.NotifyService.Success(MessagesEnum.LINK_COPIED_SUCCESS)
        else
            this.NotifyService.Error(MessagesEnum.LINK_COPIED_FAIL)
    }

    PayNow(selectedClass: CourseModels.Class) {
        let newCartItem = new CartModels.CartItem();
        newCartItem.ClassId = selectedClass.Id;

        this.CartService.addToCart(newCartItem).then(() => {
            // this.NotifyService.Success(`${selectedClass!.Name} ${MessagesEnum.CLASS_ADDED_TO_CART}`);
            this.NotifyService.Success(MessagesEnum.CLASS_ADDED_TO_CART);
        });
    }
}
