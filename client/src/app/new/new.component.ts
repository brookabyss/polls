import { Component, OnInit,  OnDestroy  } from '@angular/core';
import { Poll } from '../poll'
import { HttpService } from '../http.service'
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnDestroy {
  poll= new Poll()
  user: any;
  subscription: Subscription
  pollsubscription: Subscription
  error_messages=[]
  polls=[]
  
  constructor(private _httpService: HttpService, private _router: Router) {
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
   }

  ngOnInit() {
    this.subscription=this._httpService.observedUser.subscribe(
          user=> {
            this.user=user;
            
          },
          err=> {console.log("subscription error inside dash comp" , err);
          this.error_messages.push(err)},
          ()=>{}
      )
        this.pollsubscription=this._httpService.observedPolls.subscribe(
          polls=> {
            this.polls=polls;
            
          },
          err=> {console.log("subscription error inside dash comp" , err);
          this.error_messages.push(err)},
          ()=>{}
      )
        console.log("polls", this.polls)
  }
    onSubmit(){
      console.log("poll submitted", this.poll)
      this.poll._creator=this.user._id
      this._httpService.createPoll(this.poll)
      .then(data=>{
        console.log("the recently created polls",data)
        this._httpService.updatePolls(data)
        this._router.navigate(['dashboard'])
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
    ngOnDestroy(){
      this.subscription.unsubscribe()
      this.pollsubscription.unsubscribe()
    }
}
