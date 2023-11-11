import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { CKEditorComponent, CKEditorModule } from 'ckeditor4-angular';
@Component({
	selector: 'app-rich-textbox',
	templateUrl: './RichTextBox.html',
	standalone: true,
	viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
	imports: [FormsModule, CommonModule, CKEditorModule]
})
export class RichTextBoxComponent implements OnInit {
	@Input('Height') Height!: string;
	@Input('DropFields') DropFields: boolean = true;
	@Input('TextContent') TextContent: string = '';
	@Output() TextContentChange: EventEmitter<string> = new EventEmitter<string>();

	@ViewChild('ckeditor') ckeditor?: CKEditorComponent;

	// file:///C:/Users/YoussefMansour/Downloads/ckeditor_4.21.0_full/ckeditor/samples/toolbarconfigurator/index.html#basic
	// download the lib and open samples folder then index.html in the browser // advanced options
	editorConfig: any = {
		toolbar: [
			{ name: 'clipboard', items: ['-', 'Undo', 'Redo'] },
			{
				name: 'basicstyles',
				items: ['Bold', 'Italic', '-', 'RemoveFormat']
			},
			// { name: 'styles', items: ['Format'] },
			{
				name: 'paragraph',
				items: ['NumberedList', 'BulletedList']
			}
		],
		// https://impulsivecode.com/how-to-add-custom-button-in-ckeditor/
		removePlugins: ['elementspath', 'resize']
	};

	constructor(
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService
	) { }

	ngOnInit(): void {
		this.editorConfig.height = this.Height;
		if (!this.DropFields) return;
		const httpEndPoint = HttpEndPoints.ContactField.GetTempleteDropped;
	}

	ngAfterViewInit() {
		this.ckeditor?.ready.subscribe((evt: any) => {
			const editor = evt.editor;
			// console.log(editor);

			// Define the command for your custom button
			editor.addCommand('myCommand', {
				exec: function (editor: any) {
					// Do something when the button is clicked
					console.log('My button clicked!');
				}
			});

			editor.addCommand('about', {
				exec: function (editor: any) {
					// Do something when the button is clicked
					console.log('My button clicked!');
				}
			});

			// editor.addCommand('myCommand', {
			// 	exec: function (editor: any) {
			// 		// Do something when the button is clicked
			// 		console.log('My button clicked!');
			// 	}
			// });

			// // Add your custom button to the toolbar
			// editor.ui.addButton('youssef', {
			// 	label: 'My Button Label',
			// 	name: 'youssef',
			// 	command: 'myCommand',
			// 	toolbar: 'test',
			// 	icon: './../../../assets/img/logo.png'
			// });

			editor.toolbar = [...editor.toolbar, { name: 'test', items: ['youssef'] }];
		});
	}

	OnFieldAdded(text: string) {
		if (!this.ckeditor) return;
		const editorInstance = this.ckeditor.instance;
		const currentCursorPosition = editorInstance.getSelection().getRanges()[0];
		this.ckeditor?.instance.insertText(text, currentCursorPosition);
	}

	OnCkeditorChange(event: any) {
		this.TextContentChange.emit(this.TextContent);
	}
}
