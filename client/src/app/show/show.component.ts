import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router'
import { HttpService } from '../http.service'
import { Subscription } from 'rxjs/Subscription'
import { Poll } from '../poll'
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  user: any;
  error_messages=[]
  poll_id: any
  poll=new Poll()
  
  constructor(private _httpService: HttpService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.poll.question=""
    this._httpService.get_logged_in_user()
    .then(data=>{
      if (!data){
         this._router.navigate(['/'])
      }
      else{
          this.user=data
      }
    })
    .catch(err=>{
      this.error_messages.push(err)
    })
    this._activatedRoute.params.subscribe((param)=>{
      console.log("checked user loaded and url id given is: ", param.id);
      this.poll_id=param.id
    }) 
   }
  


  ngOnInit() {
    this._httpService.getPoll(this.poll_id)
    .then(poll=>{
      console.log("the poll",poll)
      this.poll=poll
    })
    .catch(err=>{
      this.error_messages.push(err)
    })

  }
  vote(i){
    console.log("Index", i)

    this.poll.options[i].votes+=1
    this._httpService.updatePoll(this.poll)
    .then(data=>{
      this.poll=data
    })
    .catch(err=>{
      this.error_messages.push(err)
    })

  }
  logout(){
    console.log("Logging out")
    this._httpService.logOut()
    .then(data=>{
      console.log("Logging out with data", data)
      if (data){
        this._router.navigate(['/'])
      }

    })
    .catch(err=>{
      this.error_messages.push(err)
    })
  }
  

}
