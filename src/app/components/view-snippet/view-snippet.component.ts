import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {
  codeSnippet={
    title:"",
    code:"",
    rating: 0,
    by:""
  }
  currentUserId:any = ''  // Replace this with actual logic to get current user's ID
  isCurrentUser = true
  initialRating=0

  constructor(private route:ActivatedRoute, private dbService:DbService,private authService:AuthService){
    this.currentUserId = this.authService.getUid()?this.authService.getUid():"";

  }

  ngOnInit(){
    const docId=this.route.snapshot.paramMap.get('id')
    this.dbService.getSnippetById(docId!)
        .then((data:any)=>{
          this.codeSnippet=data;
          this.isCurrentUser = this.codeSnippet.by === this.currentUserId;
        })
  }

  setRating(rating: number) {
    const docId=this.route.snapshot.paramMap.get('id')
     this.initialRating= rating;
     this.dbService.updateSnippetRating(docId!, rating); 
  }

}
