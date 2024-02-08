import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';

@Component({
    selector: 'app-confirm-user-delete',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './confirm-user-delete.component.html',
    styleUrl: './confirm-user-delete.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmUserDeleteComponent { 
    @Input()
    userForDelete?: User;

    @Output()
    confirmed = new EventEmitter();

    @Output()
    cancelled = new EventEmitter();

    onConfirm($event: MouseEvent) {
        this.confirmed.emit();
    }

    onCancel($event: MouseEvent) {
        this.cancelled.emit();
    }
}
