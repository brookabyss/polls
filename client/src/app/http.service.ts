import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HttpService {
  observedPolls=new BehaviorSubject(null);
  observedUser = new BehaviorSubject(null);

  constructor(private _http:Http) {
   }
  updatePolls(polls){
    this.observedPolls.next(polls)
  }
  updateUser(user){
    this.observedUser.next(user)
  }
  get_logged_in_user(){
    console.log(" get logged in user from service")
    return this._http.get('/get_logged_in_user').map(data => data.json()).toPromise()
  }
  login(user){
    console.log('http login service', user.name)
    return this._http.post('/login', user).map(data => data.json()).toPromise()
  }
  getUsers(){
        console.log(" Service get users service")
        return this._http.get('/get_users').map(data => data.json()).toPromise()

  }
  logOut(){
    console.log("logout service")
    return this._http.get('/user/logout').map(data=>data.json()).toPromise()
  }
  createPoll(poll){
        console.log('create poll service', poll.options)
        return this._http.post('/create_poll', poll).map(data => data.json()).toPromise()

  }
  getPolls(){
    console.log(" Service get Polls service")
    return this._http.get('/get_polls').map(data => data.json()).toPromise()

  }
  getPoll(id){
    console.log(" Service get user Poll service", id)
    return this._http.post('/getPoll', {id: id}).map(data => data.json()).toPromise()


  }

  updatePoll(poll){
     console.log(" Service update Poll service")
    return this._http.post('/updatePoll',poll).map(data => data.json()).toPromise()
  }
  deletePoll(id){
    console.log(" Service delete Poll service")
    return this._http.post('/deletePoll',{id:id}).map(data => data.json()).toPromise()
  }
  

  

  
}
