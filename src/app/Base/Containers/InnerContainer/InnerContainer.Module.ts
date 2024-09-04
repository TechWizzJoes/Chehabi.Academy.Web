import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';

// import { UsernamePasswordPopupModule } from '@App/Common/Components/UsernamePasswordPopup/UsernamePasswordPopup.Module';

import { InnerContainerRoutes } from './InnerContainer.Routes';
import { InnerContainer } from './InnerContainer';
import { FooterComponent } from './Components/Footer/Footer';
import { MenuComponent } from './Components/Menu/Menu';
import { HeaderComponent } from './Components/Header/Header';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationService } from '@App/Common/Services/Application.Service';
import { CartButtonComponent } from '@App/Common/Widgets/Cart/cart-button/cart-button.component';
import { LanguagePopUpComponent } from '@App/Common/Widgets/LanguagePopUp/LanguagePopUp';
import { NotificationButtonComponent } from '@App/Common/Widgets/NotificationButton/NotificationButton';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InnerContainerRoutes,
		NgbPopoverModule,
		RouterModule,
		TranslateModule,
		CartButtonComponent,
		LanguagePopUpComponent,
		NotificationButtonComponent
	],
	declarations: [InnerContainer, HeaderComponent, MenuComponent, FooterComponent],
	providers: [ApplicationService]
})
export class InnerContainerModule { }
