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

@NgModule({
	imports: [CommonModule, FormsModule, InnerContainerRoutes, NgbPopoverModule, RouterModule, TranslateModule],
	declarations: [InnerContainer, HeaderComponent, MenuComponent, FooterComponent],
	providers: [ApplicationService]
})
export class InnerContainerModule { }
