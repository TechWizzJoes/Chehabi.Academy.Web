import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OuterContainerRoutes } from './OuterContainer.Routes';
import { OuterContainer } from './OuterContainer';

@NgModule({
	declarations: [OuterContainer],
	imports: [CommonModule, FormsModule, OuterContainerRoutes],
	providers: []
})
export class OuterContainerModule {}
