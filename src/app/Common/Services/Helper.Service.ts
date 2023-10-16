import { Injectable, OnDestroy, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { GridOptionsModel } from '@App/Common/Components/TableServer/GridOptionsModel';

@Injectable({ providedIn: 'root' })
export class HelperService {
	constructor() {}

	// Translate(key: string): string {
	// 	return this.TranslateService.instant(key);
	// }

	GenerateSequence(start: number, end: number) {
		let arr = [];
		if (end > start) {
			for (let i = start; i <= end; i++) {
				arr.push(i);
			}
		} else {
			for (let i = start; i >= end; i--) {
				arr.push(i);
			}
		}
		return arr;
	}

	CheckPropName(obj: any, key: string): string {
		const keys = Object.keys(obj);
		return keys.indexOf(key) > -1 ? key : '';
	}

	AddDays(date: Date | null, days: number) {
		if (date) {
			let addedDay = new Date(date);
			addedDay.setDate(addedDay.getDate() + days);
			return addedDay;
		}
		return null;
	}

	IsDateGreaterThan(date1: Date | string | null, date2: Date | string | null) {
		if (date1 && date2) {
			return !(new Date(date1) < new Date(date2));
		} else {
			return false;
		}
	}

	IsDateGreaterThanOrEqual(date1: Date | string | null, date2: Date | string | null) {
		if (date1 && date2) {
			return !(new Date(date1) <= new Date(date2));
		} else {
			return false;
		}
	}

	GetYesterdayDate(): Date {
		let date: Date = new Date();
		date.setDate(date.getDate() - 1);
		return date;
	}

	GetLastYears(yearsCount: number) {
		let years: { Id: number; Name: number }[] = [];
		let year = new Date().getFullYear() + 1;
		for (let i = year; i >= year - yearsCount; i--) {
			years.push({ Id: i, Name: i });
		}
		return years;
	}

	EncodeURIComponent(str: string): string {
		return encodeURIComponent(str);
	}

	// AdjustServerPagingEndPoint(httpEndPoint: string, filterStr: string, gridOptions: GridOptionsModel): string {
	// 	httpEndPoint = httpEndPoint.replace('{pageSize}', String(gridOptions.PageSize));
	// 	httpEndPoint = httpEndPoint.replace('{pageIndex}', String(gridOptions.PageIndex));
	// 	httpEndPoint = httpEndPoint.replace('{sortField}', gridOptions.SortField);
	// 	httpEndPoint = httpEndPoint.replace('{sortOrder}', gridOptions.SortOrder);
	// 	httpEndPoint = httpEndPoint.replace('{filter}', this.EncodeURIComponent(filterStr));
	// 	return httpEndPoint;
	// }

	Clone<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj));
	}

	IsChanged<T>(origin: T, cloned: T) {
		return JSON.stringify(origin) != JSON.stringify(cloned);
	}

	Distinct<T>(arr: T[]) {
		const distincitArr = [...new Set(arr)];
		return distincitArr;
	}

	Similarity(s1: string, s2: string) {
		var longer = s1;
		var shorter = s2;
		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}
		var longerLength: any = longer.length;
		if (longerLength == 0) {
			return 1.0;
		}
		return (longerLength - this.EditDistance(longer, shorter)) / parseFloat(longerLength);
	}

	EditDistance(s1: string, s2: string) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();

		var costs = new Array();
		for (var i = 0; i <= s1.length; i++) {
			var lastValue = i;
			for (var j = 0; j <= s2.length; j++) {
				if (i == 0) costs[j] = j;
				else {
					if (j > 0) {
						var newValue = costs[j - 1];
						if (s1.charAt(i - 1) != s2.charAt(j - 1))
							newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
						costs[j - 1] = lastValue;
						lastValue = newValue;
					}
				}
			}
			if (i > 0) costs[s2.length] = lastValue;
		}
		return costs[s2.length];
	}

	// public GetDateObject = function (dateStr) {
	// 	let dateObj = { Day: null, Month: null, Year: null };
	// 	if (dateStr) {
	// 		let date = new Date(dateStr);
	// 		dateObj.Day = date.getDate();
	// 		dateObj.Month = date.getMonth();
	// 		dateObj.Year = date.getFullYear();
	// 	}
	// 	return dateObj;
	// }

	// public GetUtcDate = function (dateObj: { Day: null, Month: null, Year: null }) {
	// 	return new Date(Date.UTC(dateObj.Year, dateObj.Month, dateObj.Day));
	// }
}
