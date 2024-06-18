import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mystore',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mystore.component.html',
  styleUrl: './mystore.component.css'
})
export class MystoreComponent {
  constructor(private dbService:DbService){}
  items:{id:string,title:string}[]=[]
  ngOnInit(){
      this.dbService.getUserSnippet()
        .then((data:any)=>{
          console.log(data)
            this.items=data
        })
        
  }
deleteItem(id: string) {
  this.items = this.items.filter(item => item.id !== id);
  this.dbService.deleteSnippet(id)
 
  // Optionally, add additional logic for deleting the item, e.g., calling a service
}

}




