import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data/data.service';
import { Role } from '../../models/role';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-user',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './create-user-page.component.html',
    styleUrl: './create-user-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit, OnDestroy {
    allRoles = [] as Role[];

    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        emailAddress: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        roles: new FormArray([])
    });

    constructor(private data: DataService, private changeDetectionRef: ChangeDetectorRef, private router: Router) { 
    }

    get roles() {
        return this.createUserForm.value.roles;
    }

    async ngOnInit() {
        this.allRoles = await this.data.getRolesAsync();
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy(): void {
    }

    onCreateUser($event: SubmitEvent) {
        const userForCreation = {
            name: this.createUserForm.value.name,
            emailAddress: this.createUserForm.value.emailAddress,
            password: this.createUserForm.value.password,
            roles: this.createUserForm.value.roles
        };
        this.data.createUserAsync(userForCreation).subscribe((r) => {
            this.router.navigate(['identity-manager']);
        });
    }

    onCheckRole(role: Role) {
        const roles = this.createUserForm.get('roles') as FormArray;
        if (!roles.value.includes(role.id)) {
            roles.value.push(role.id);
        } else {
            var idx = roles.value.indexOf(role.id);
            roles.value.splice(idx, 1);
        }
    }
}
