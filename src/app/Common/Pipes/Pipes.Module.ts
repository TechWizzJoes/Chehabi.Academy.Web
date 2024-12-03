import { NgModule } from '@angular/core';

import { SecondsFormatPipe } from './SecondsFormat.Pipe';
import { SafePipe } from './SafePipe.pipe';

@NgModule({
	declarations: [SecondsFormatPipe, SafePipe],
	exports: [SecondsFormatPipe, SafePipe]
})
export class PipesModule { }
