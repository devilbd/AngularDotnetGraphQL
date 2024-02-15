import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data/data.service';
import { IdentityManagerPageVM } from './models/identity-manager-page.viewmodel';
import { User } from '../../models/user';
import { WindowBoxComponent } from '../../components/WindowBox/window-box.component';
import { ConfirmUserDeleteComponent } from '../dialogs/ConfirmUserDelete/confirm-user-delete.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-identity-manager-page',
  standalone: true,
  imports: [
    CommonModule,
    WindowBoxComponent,
    ConfirmUserDeleteComponent,
    RouterLink
  ],
  templateUrl: './identity-manager-page.component.html',
  styleUrl: './identity-manager-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityManagerComponent implements OnInit { 
    @ViewChild('confirmDeleteWindowBox')
    confirmDeleteWindowBox!: WindowBoxComponent;

    viewModel = {
      users: [],
    } as IdentityManagerPageVM;

    constructor(private data: DataService, private changeDetectionRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
      this.onGetData(null);
    }

    async onGetData($event: any) {
      this.viewModel.users = await this.data.getUsersAsync();
      this.changeDetectionRef.detectChanges();
    }

    onDelete(user: User) {
      this.viewModel.userForDelete = user;
      this.confirmDeleteWindowBox.show();
    }

    onCancel($event: MouseEvent) {
      this.confirmDeleteWindowBox.hide();
    }

    onConfirm($event: MouseEvent) {
      const userId = this.viewModel.userForDelete?.id;
      const subscription = this.data.deleteUserAsync(userId)?.subscribe((r) => {
        const idx = this.viewModel.users.findIndex((user) => user.id === userId);
        const newArr = [...this.viewModel.users];
        newArr.splice(idx, 1);
        this.viewModel.users = newArr;
        this.viewModel.userForDelete = undefined;
        this.confirmDeleteWindowBox.hide();
        this.changeDetectionRef.detectChanges();
        subscription?.unsubscribe();
      });
    }
}
