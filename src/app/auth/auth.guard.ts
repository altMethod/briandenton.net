import { PostService } from './../services/post/post.service';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  isAdmin: boolean;
  uid: string;
  email: string;

  constructor(private auth: AuthService, private router: Router, private postService: PostService) {
    this.isAdmin = this.auth.isAdmin;
   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
