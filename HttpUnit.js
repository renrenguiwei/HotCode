/**
 * Created by qiangxl on 20/08/2017.
 */

export default class HttpUnit{

  // Fetch GET请求
  static get(url){
    return new Promise((resolve,reject)=>{
      fetch(url)
        .then(response=>response.json())
        .then(result=>{
          resolve(result)
        })
        .catch(error=>{
          reject(error)
        })
    })
  }

  // Fetch POST请求
  static post(url,data){
    return new Promise((resolve,reject)=> {
      fetch(url, {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}
