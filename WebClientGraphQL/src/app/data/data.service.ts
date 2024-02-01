import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private apiEndPoint = 'http://localhost:5048/graphql';
    private users = [] as User[];

    constructor(private apollo: Apollo) {}

    async getUsersAsync() {
      const usersQuery = this.apollo.watchQuery({
        query: gql`
          query {
            users {
              id
              name
              roles {
                id
                name
                userId
              }
            }
          }
      `});
      const result = await usersQuery.refetch();
      this.users = (<any>result).data.users as User[];
      return this.users;
    }
}
