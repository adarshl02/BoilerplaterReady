import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Snippet } from '../../models/snippet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;

  constructor(private authService: AuthService,private router:Router) {
    this.db = getFirestore();
  }
  // CREATE
  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        by: this.authService.getUid(),
      });

      console.log('Document written with ID: ', docRef.id);
      this.router.navigate(['/store'])

    } catch (e) {
      console.error('Error adding document: ', e);
      alert('error while creating');
    }
  }

  async updateSnippet(snippet:Snippet,docId:string){
    try{
      const docRef = doc(this.db, 'snippets', docId);
      await updateDoc(docRef, {
        ...snippet,
        by: this.authService.getUid(),
        });
        console.log('Document updated with ID: ',docId);
        this.router.navigate(['/mystore'])
        }catch(e){
          console.error('Error updating document: ', e);
          alert('error while updating');
          }
  }


  // READ
  async getAllSnippet() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async getUserSnippet(){
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      if(doc.data()['by'] === this.authService.getUid()){
        console.log(`${doc.id} => ${doc.data()}`);
        result.push({ id: doc.id, ...doc.data() });
      }
        });
        return result;
  } 
            //Delete
  async deleteSnippet(docId:string){
    await deleteDoc(doc(this.db, 'snippets', docId));
  }


                  //READ SINGLE
  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippets', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data()
    } else {
      console.log('No such document!');
      return {
        id:"1",
        title: 'No such document',
        code: 'No such document',
      }
    }
  }



}
