import { Routes } from '@angular/router';
import { IdentityManagerComponent } from './pages/identity-manager-page/identity-manager-page.component';
import { CreateUserComponent } from './pages/create-user-page/create-user-page.component';

export const routes: Routes = [
    {
        path: 'identity-manager', component: IdentityManagerComponent
    },
    {
        path: 'create-user', component: CreateUserComponent
    }
];
