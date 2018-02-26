import { SnapshotAction } from 'angularfire2/database/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Post } from './post';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postDoc?: AngularFirestoreDocument<Post>;
  posts: Observable<any[]>;
  post: Observable<Post>;
  docExists: boolean;
  projects: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    // Get all posts
    this.postCollection = this.afs.collection<Post>('posts');
    this.posts = this.postCollection.valueChanges();
    this.projects = this.afs.collection<Post>('projects').valueChanges();
  }

  // Get post by id
  postById(collection: string, post_id: string): any {
    this.postDoc = this.afs.doc<Post>(`${collection}/${post_id}`);
    this.post = this.postDoc.valueChanges();
    return this.post;
  }

  // Create new post
  create(collection: string, content: Post): void {
    this.afs.collection(collection).doc(content.id).set(content);
  }

  // Edit post
  edit(collection: string, post_id: string, content: Post): void {
    this.afs.collection(collection).doc(post_id).update(content);
  }

  // Delete post
  delete(collection: string, post_id: string): void {
    this.afs.collection(collection).doc(post_id).delete();
  }

  // Check if post exists
  exists(collection?: string, post_id?: string): Promise<any> {
    if (collection && post_id) {
      this.postDoc = this.afs.collection(collection).doc(post_id);
      return this.postDoc.ref.get().then(res => {
        return res.exists || false;
      }).catch(error => error);
    } else {
      return new Promise(null);
    }
  }

}
