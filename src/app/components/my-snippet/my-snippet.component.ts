import { Component,OnInit  } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-snippet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-snippet.component.html',
  styleUrl: './my-snippet.component.css'
})
export class MySnippetComponent implements OnInit {
  codeSnippet={
    title:"",
    code:""
  }
  docId: any
  editableSnippet: any = { title: '', code: '' }; // Editable copy

  constructor(private route:ActivatedRoute, private dbService:DbService){}

  ngOnInit(){
    this.docId=this.route.snapshot.paramMap.get('id')
    this.dbService.getSnippetById(this.docId!)
        .then((data:any)=>{
          this.codeSnippet=data
         this.editableSnippet = { ...data}; // Create a copy for editing

        })
  }

   async saveSnippet() {
     await this.dbService.updateSnippet(this.editableSnippet,this.docId)
  }
}





