import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: '',
				loadChildren: () =>
					import('./Containers/OuterContainer/OuterContainer.Module').then((m) => m.OuterContainerModule)
			},
			{
				path: '',
				loadChildren: () =>
					import('./Containers/InnerContainer/InnerContainer.Module').then((m) => m.InnerContainerModule)
			}
		]
	}
];
