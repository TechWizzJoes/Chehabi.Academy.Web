import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { TranslateModule } from '@ngx-translate/core';

// import { UsernamePasswordPopupModule } from '@App/Common/Components/UsernamePasswordPopup/UsernamePasswordPopup.Module';

import { InnerContainerRoutes } from './InnerContainer.Routes';
import { InnerContainer } from './InnerContainer';
import { FooterComponent } from './Components/Footer/Footer';
import { HeaderComponent } from './Components/Header/Header';
import { MenuComponent } from './Components/Menu/Menu';

@NgModule({
	imports: [CommonModule, FormsModule, InnerContainerRoutes],
	declarations: [InnerContainer, HeaderComponent, MenuComponent, FooterComponent],
})
export class InnerContainerModule { }
