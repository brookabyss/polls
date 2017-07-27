import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../user'
import { Router } from '@angular/router'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user= new User
  constructor(private _httpService: HttpService, private _router: Router) { 
    console.log("inside the const")
  }

  ngOnInit() {
     
  }

  onSubmit(){
    console.log("Index component, submit",this.user)
    this._httpService.login(this.user)
        .then(data=>{
          console.log("Reply data from login inside index", data)
          this._httpService.updateUser(data)
          this._router.navigate(['dashboard'])
        })
        .catch(err=> console.log("error from server inside index comp",err))
        this.user= new User
  }

}
