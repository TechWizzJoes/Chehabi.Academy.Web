import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
// import { ToastifyService } from '@App/Common/Services/Toastify.Service';

import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { NgtCanvas, extend, NgtBeforeRenderEvent } from 'angular-three';
import * as THREE from 'three';

extend(THREE)


@Component({
	standalone: true,
	templateUrl: './SceneGraph.html',
	styleUrls: ['SceneGraph.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SceneGraph implements OnInit {



	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
		private FormBuilder: FormBuilder,



	) {


	}

	onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
		event.object.rotation.x += 0.01;
	}

	ngOnInit() { }
}



@Component({
	selector: 'Scene',
	standalone: true,
	template: `<ngt-canvas [sceneGraph]="SceneGraph"/>`,
	styles: ['ngt-canvas{width:100%,height:100%}'],
	imports: [NgtCanvas],
})
export class Scene {
	readonly SceneGraph = SceneGraph;
}