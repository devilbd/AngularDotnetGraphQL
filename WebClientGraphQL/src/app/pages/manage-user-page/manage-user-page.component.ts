import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data/data.service';
import { Role } from '../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-manage-user',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './manage-user-page.component.html',
    styleUrl: './manage-user-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserComponent implements OnInit, OnDestroy {
    userId!: number;
    userForEdit!: User;


    allRoles = [] as Role[];

    userForm = new FormGroup({
        name: new FormControl('', Validators.required),
        emailAddress: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        roles: new FormArray([])
    });

    constructor(private data: DataService, private changeDetectionRef: ChangeDetectorRef, private router: Router, private activatedRoute: ActivatedRoute) { 
        
    }

    get roles() {
        return this.userForm.value.roles;
    }

    roleChecked(role: Role) {
        if (!role || !this.userForEdit) return false;
        const check = this.userForEdit.roles.find(userRole => {
            if (userRole.id == role.id) {
                return true;
            }
            return false;
        })
        return check;
    }

    async ngOnInit() {
        this.allRoles = await this.data.getRolesAsync();
        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                this.userId = Number(params.get('userId'));
                this.data.getUserById(this.userId).then(r => {
                    this.userForEdit = r;
                    this.fillUserForm();
                    this.changeDetectionRef.detectChanges();
                    this.userForm.updateValueAndValidity();
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy(): void {
    }

    fillUserForm() {
        if (this.userForEdit) {
            this.userForm.get('name')?.setValue(this.userForEdit.name);
            this.userForm.get('emailAddress')?.setValue(this.userForEdit.emailAddress);
            this.userForEdit.roles.forEach(role => {
                const rolesFormArray = this.userForm.get('roles') as FormArray;
                rolesFormArray?.value.push(role);
            });
        }
    }

    onCreateUser($event: SubmitEvent) {
        const userForCreation = {
            name: this.userForm.value.name,
            emailAddress: this.userForm.value.emailAddress,
            password: this.userForm.value.password,
            roles: this.userForm.value.roles
        };
        this.data.createUserAsync(userForCreation).subscribe((r) => {
            this.router.navigate(['identity-manager']);
        });
    }

    onCheckRole(role: Role) {
        const roles = this.userForm.get('roles') as FormArray;
        if (!roles.value.includes(role.id)) {
            roles.value.push(role.id);
        } else {
            var idx = roles.value.indexOf(role.id);
            roles.value.splice(idx, 1);
        }
    }
}
