import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getKeys'
})
export class GetKeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log("value",value)
    let result=[]
    if(!value){
      return value
    }
    let i=1
    for (let keys in value){
      
      result.push([i,value[keys]])
      i+=1
    }
    console.log(result,"result")
    return result
  }

}
