import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OuterContainerRoutes } from './OuterContainer.Routes';
import { OuterContainer } from './OuterContainer';
import { HeaderComponent } from '../InnerContainer/Components/Header/Header';
import { FooterComponent } from '../InnerContainer/Components/Footer/Footer';

@NgModule({
	declarations: [OuterContainer],
	imports: [CommonModule, FormsModule, OuterContainerRoutes, HeaderComponent, FooterComponent],
	providers: []
})
export class OuterContainerModule { }
