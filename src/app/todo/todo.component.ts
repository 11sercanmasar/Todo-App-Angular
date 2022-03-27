
import { Component } from '@angular/core';
import { Models } from 'src/models';
import {TodoItem }from '../todoitem'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  {
  constructor() { 
    this.model.items = this.getItemsFromLocalSt();
  }

  inputTxt: string = ""

  displayAll : boolean = false;

  addItem(){
    if(this.inputTxt != "" ){
    let data = {  description :`${this.inputTxt}`, action: false }
    this.model.items.push(data);

    let items = this.getItemsFromLocalSt();
    items.push(data);

    localStorage.setItem("items", JSON.stringify(items))
    this.inputTxt = "";
    }
    else{ 
      alert("Please type a todo");
    }
  }

  getItemsFromLocalSt(){
    let items:TodoItem[] = [];
    let value   = localStorage.getItem("items");
    if (value != null){
      items = JSON.parse(value)
    }
    return items;
  }

  onActionChanged(item: TodoItem){
   let items = this.getItemsFromLocalSt();
   localStorage.clear();
   items.forEach(i => {
     if(i.description == item.description){
       i.action = item.action;
     }
   })
   localStorage.setItem("items", JSON.stringify(items))
  }



  model = new Models();
 
  getName(){
    return this.model.name
  }

  getItems(){
    if(this.displayAll){
   return this.model.items;
    }
   return this.model.items.filter(item => item.action == false);
  }

  displayCount(){
    return this.model.items.filter(item => item.action) 
  }

  getBtnClasses(){
    return { 
      'disabled' : this.inputTxt.length == 0, 
      'btn-secondary' : this.inputTxt.length == 0,
      'btn-primary' : this.inputTxt.length > 0,
      'text-white' : this.inputTxt.length > 0
    }
  }

}
