import { NgModule } from '@angular/core';

import { NumberToDayPipe } from './NumberToDay.Pipe';
import { ToBrPipe } from './ToBr.Pipe';
import { SecondsFormatPipe } from './SecondsFormat.Pipe';
import { SafePipe } from './SafePipe.pipe';

@NgModule({
	declarations: [ToBrPipe, NumberToDayPipe, SecondsFormatPipe, SafePipe],
	exports: [ToBrPipe, NumberToDayPipe, SecondsFormatPipe, SafePipe]
})
export class PipesModule { }
