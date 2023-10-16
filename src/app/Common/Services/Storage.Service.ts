import { Injectable } from '@angular/core';

export enum StorageEnum {
	// Language = 'Language',
	AccessToken = 'AccessToken',
	RefreshToken = 'RefreshToken',
	CurrentUser = 'CurrentUser',
	ContainerDns = 'ContainerDns',
	UserMenu = 'UserMenu',
	UsersLookup = 'UsersLookup',
	UserDIDs = 'UserDIDs',
	UserSMSDIDs = 'UserSMSDIDs',
	ContactFilter = 'ContactFilter',
	ContactColumns = 'ContactColumns',
	SessionContactIDs = 'SessionContactIDs',
	TransferUserNames = 'TransferUserNames'
}

@Injectable({ providedIn: 'root' })
export class StorageService {
	SetSessionStorage(key: StorageEnum, obj: string | JSON | Object) {
		let objStr = JSON.stringify(obj);
		sessionStorage.setItem(key, objStr);
	}

	GetSessionStorage(key: StorageEnum) {
		let objStr = sessionStorage.getItem(key);
		return !!objStr ? JSON.parse(objStr) : null;
	}

	RemoveSessionStorage(key: StorageEnum) {
		sessionStorage.removeItem(key);
	}

	SetLocalStorage(key: StorageEnum, obj: string | JSON | Object) {
		let objStr = JSON.stringify(obj);
		localStorage.setItem(key, objStr);
	}

	GetLocalStorage<T = any>(key: StorageEnum): T {
		let objStr = localStorage.getItem(key);
		let obj = JSON.parse(objStr || '{}');
		return obj as T;
	}

	RemoveLocalStorage(key: StorageEnum) {
		localStorage.removeItem(key);
	}

	//Taraman: TBR
	// CurrentLanguageGet(): string | JSON | null {
	// 	return this.GetLocalStorage(StorageEnum.Language);
	// }
}
