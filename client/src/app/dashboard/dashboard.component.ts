import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../http.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  error_messages=[]
  polls=[]
  pollsubscription: Subscription
  user:any
  subscription: Subscription
  term=""
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
    this._httpService.getPolls()
    .then(polls=>{
      this.polls=polls
      console.log("Pollss in the dashboard", polls)
      this._httpService.updatePolls(polls)
      
    })
    .catch(err=>{
      console.log(err)
      this.error_messages.push(err)
    })
    this.pollsubscription=this._httpService.observedPolls.subscribe(
          polls=> {
            this.polls=polls;
            
          },
          err=> {console.log("subscription error inside dash comp" , err);
          this.error_messages.push(err)},
          ()=>{}
    )
    this.subscription=this._httpService.observedUser.subscribe(
          user=> {
            this.user=user;
            
          },
          err=> {console.log("subscription error inside dash comp" , err);
          this.error_messages.push(err)},
          ()=>{}
      )
   }

  ngOnInit() {
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
  delete(id){
    console.log(id,"Delete id")
    this._httpService.deletePoll(id)
    .then(polls=>{
      this.polls=polls

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
