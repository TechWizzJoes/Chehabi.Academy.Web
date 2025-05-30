import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.Service';
import { io, Socket } from "socket.io-client";
import { AppConfig } from '@App/Base/AppConfig';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socket!: Socket | null;
    private ApiUrl: string = '';

    constructor(private AuthService: AuthService, private AppConfig: AppConfig) {
        this.SetApiUrl();
    }

    SetApiUrl() {
        this.AppConfig.ApiUrl.subscribe((url) => {
            (this.ApiUrl = url);
            this.connect();
        });
    }

    connect(): void {
        if (!this.AuthService.IsAuthenticated) return;
        if (this.socket) return;

        this.socket = io(this.ApiUrl.replace('api/', ''), {
            // path: '/socket.io',
            // transports: ['websocket'], // Force WebSocket transport only,
            autoConnect: true,
            reconnection: true, // Enable reconnection
            reconnectionAttempts: Infinity, // Maximum number of reconnection attempts
            reconnectionDelay: 3000, // Initial delay between reconnection attempts (in milliseconds)
            reconnectionDelayMax: 10000, // Maximum delay between reconnection attempts (in milliseconds)
            randomizationFactor: 0.5, // Randomization factor for the reconnection delay calculation
            query: {
                userId: this.AuthService.CurrentUser.Id,
            },
            auth: {
                token: this.AuthService.AccessToken,
            },
        });

        this.socket.on('connect', () => {
            // console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            // console.log('Disconnected from WebSocket server');
        });

        this.socket.on('notification', (data) => {
        });
    }

    // Send a message to the server
    sendMessage(event: string, data: any): void {
        this.socket?.emit(event, data);
    }

    // Listen for messages from the server
    onMessage(event: string): Observable<any> {
        return new Observable((observer) => {
            this.socket?.on(event, (data: any) => {
                observer.next(data);
                // console.log(data);
            });
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}
