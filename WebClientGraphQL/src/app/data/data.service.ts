import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { Apollo, gql } from 'apollo-angular';
import { Role } from '../models/role';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiEndPoint = 'http://localhost:5048/graphql';
    private users = [] as User[];
    private allRoles = [] as Role[];
    private userDeletedSubject = new Subject<number>();
    private userCreatedSubject = new Subject<number>();

    constructor(private apollo: Apollo) {}

    async getUsersAsync() {
      const usersQuery = this.apollo.watchQuery({
        query: gql`
          query {
            allUsers(includeRoles: true) {
              id
              name
              emailAddress
              roles {
                  id
                  name
              }
            }
          }
      `});
      const result = await usersQuery.refetch();
      this.users = (<any>result).data.allUsers as User[];
      return this.users;
    }

    async getRolesAsync() {
      const rolesQuery = this.apollo.watchQuery({
        query: gql`
          query {
            allRoles {
              id
              name
            }
          }
        `
      });
      const result = await rolesQuery.refetch();
      this.allRoles = (<any>result).data.allRoles as Role[];
      return this.allRoles;
    }

    createUserAsync(user: { name: any, emailAddress: any, password: any, roles: any }) {
      const mutation = this.apollo.mutate({
        mutation: gql`
          mutation CreateUser($user: UserDTOInput!){
            createUser(input: { user: $user } ) {
              user {
                id
              }
            }
          }
        `,
        variables: {
          user: {
            name: user.name,
            emailAddress: user.emailAddress,
            password: user.password,
            roles: user.roles
          }
        }
      });
      mutation.subscribe({
        next: (data) => {
          this.userCreatedSubject.next((<any>data).id);
        },
        error: (error) => {
          console.log(error);
        }
      });
      return this.userCreatedSubject.asObservable();
    }

    deleteUserAsync(userId: number = 0) {
      if (!userId) return;
      const mutation = this.apollo.mutate({
        mutation: gql`
          mutation DeleteUser($userId: Long!) {
            deleteUser(input: { userId: $userId }) {
              long
            }
          }
        `,
        variables: {
          userId: userId
        }
      })
      mutation.subscribe({
        next: (data) => {
          this.userDeletedSubject.next((<any>data).long);
        },
        error: (error) => {
          console.log(error);
        }
      });
      return this.userDeletedSubject.asObservable();
    }
}
