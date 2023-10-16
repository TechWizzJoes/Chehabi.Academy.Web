import { Pipe, PipeTransform } from '@angular/core';
import { TagModels } from '@App/Common/Models/Tag.Model';

@Pipe({ name: 'tagFilter', standalone: true })
export class TagFilterPipe implements PipeTransform {
	transform(items: TagModels.TagResModel[], searchText: string): TagModels.TagResModel[] {
		console.log(searchText, items);
		return items?.filter((tag) => {
			return tag.Name?.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
		});
	}
}
