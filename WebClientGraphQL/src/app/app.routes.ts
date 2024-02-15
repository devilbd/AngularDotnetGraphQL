import { Routes } from '@angular/router';
import { IdentityManagerComponent } from './pages/identity-manager-page/identity-manager-page.component';
import { ManageUserComponent } from './pages/manage-user-page/manage-user-page.component';

export const routes: Routes = [
    {
        path: 'identity-manager', component: IdentityManagerComponent
    },
    {
        path: 'create-user', component: ManageUserComponent
    },
    {
        path: 'edit-user/:userId', component: ManageUserComponent
    }
];
