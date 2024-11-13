import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessagesEnum } from '@App/Common/Enums/Messages.Enum';
import { CartService } from '@App/Common/Services/cart.service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { Constants } from '@App/Common/Settings/Constants';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkoutsuccess',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './checkoutsuccess.component.html',
  styleUrl: './checkoutsuccess.component.scss'
})
export class CheckoutsuccessComponent {
  RoutePaths = RoutePaths;
  referenceNumber: string | null = null;

  constructor(
    private cartService: CartService,
    private ActivatedRoute: ActivatedRoute,
    private NotifyService: NotifyService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.cartService.GetCart();
    }, 500);

    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.referenceNumber = params.get('reference_number');
    });
  }

  async copyRefrenceNumber() {
    const copied = await Constants.copyToClipboard(this.referenceNumber?.toString() ?? "");
    if (copied)
      this.NotifyService.Success(MessagesEnum.REFRENCE_NUMBER_COPIED_SUCCESS)
    else
      this.NotifyService.Error(MessagesEnum.REFRENCE_NUMBER_COPIED_FAIL)
  }
}
