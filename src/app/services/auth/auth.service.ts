import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { PostService } from '../post/post.service';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  authState: Observable<firebase.User>;
  currentUser: firebase.User;
  userCollection: Promise<any>;
  document: Promise<any>;
  email: string;
  isAdmin: boolean;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private postService: PostService) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      user ? this.currentUser = user : this.currentUser = null;
      user ? this.email = user.providerData[0].email : this.email = null;
      this.postService.exists('users', this.email).then(res => {
        this.isAdmin = res;
      })
      .catch(error => error);
    });
  }

  getAuthState(): Observable<firebase.User> {
    return this.authState;
  }

  getUserName(): string {
    return this.currentUser.providerData[0].displayName || null;
  }

  login(): Object {
    return this.afAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout(): void {
    localStorage.clear();
    this.afAuth.auth.signOut();
  }

}
