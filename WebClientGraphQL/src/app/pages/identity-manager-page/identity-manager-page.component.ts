import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { HomePageViewModel } from './models/identity-manager-page.viewmodel';
import { User } from '../../models/user';

@Component({
  selector: 'app-identity-manager-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './identity-manager-page.component.html',
  styleUrl: './identity-manager-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityManagerComponent implements OnInit { 

    viewModel = {
      users: [],
    } as HomePageViewModel;

    constructor(private data: DataService, private changeDetectionRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
      this.onGetData(null);
    }

    async onGetData($event: any) {
      this.viewModel.users = await this.data.getUsersAsync();
      this.changeDetectionRef.detectChanges();
    }
}
