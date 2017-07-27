import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPolls'
})
export class SearchPollsPipe implements PipeTransform {

  transform(value: any, term: any): any {
     console.log("Search value",value)
     if (!value){
       return value
     }
    return value.filter(poll=>{
      if (term){
           if (poll.question.includes(term)){
        return poll
              }
      }
            else{
              return poll
            }
     
    })
  }

}
