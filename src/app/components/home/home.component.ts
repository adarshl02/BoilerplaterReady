import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private dbService:DbService){}
  items:{id:string,title:string,rating:number}[]=[]
  ngOnInit(){
      this.dbService.getAllSnippet()
        .then((data:any)=>{
          console.log(data)
            this.items=data
        })
        
  }

}
