import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippet';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.css'
})
export class CreateStoreComponent {

  constructor(private dbService:DbService){}

  title=new FormControl("",[
    Validators.required,
  ])

  code=new FormControl("",[
    Validators.required,
  ])

  storeForm=new FormGroup({
    title:this.title,
    code:this.code
  })

  async save(){
    // console.log(this.storeForm.value)
    await this.dbService.createSnippet(this.storeForm.value as Snippet) //typecasting
  }

}
