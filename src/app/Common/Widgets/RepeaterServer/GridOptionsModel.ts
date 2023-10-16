export enum SortOrderEnum {
	Asc = 'Asc',
	Desc = 'Desc'
}

export class GridOptionsModel {
	public Count!: number;
	public PageIndex: number = 0;
	public PageSize: number = 25;
	public PageSizeOptions: number[] = [25, 50, 100, 200];
	public SortField: string;
	public SortOrder: SortOrderEnum;
	//public IsPaged: boolean = true;

	constructor(SortField: string, SortOrder: SortOrderEnum) {
		this.SortField = SortField;
		this.SortOrder = SortOrder;
	}
}
