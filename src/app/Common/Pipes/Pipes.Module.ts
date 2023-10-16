import { NgModule } from '@angular/core';

import { NumberToDayPipe } from './NumberToDay.Pipe';
import { ToBrPipe } from './ToBr.Pipe';
import { SecondsFormatPipe } from './SecondsFormat.Pipe';

@NgModule({
	declarations: [ToBrPipe, NumberToDayPipe, SecondsFormatPipe],
	exports: [ToBrPipe, NumberToDayPipe, SecondsFormatPipe]
})
export class PipesModule {}
