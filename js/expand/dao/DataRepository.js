/**
 * Created by qiangxl on 20/08/2017.
 */
import React,{Component} from 'react';
import {
  AsyncStorage
} from 'react-native';

export default class DataRepository{

  static fetchRepository(url){
    return new Promise((resolve,reject)=>{
      // 获取本地的数据
      this.fetchLocalRepository(url)
        .then(result=>{
          if (result){
            resolve(result);
          }else{
            // 获取本地数据不存在，转而获取网络的数据
            this.fetchNetRepository(url)
              .then(result=>{
                resolve(result);
              })
              .catch(e=>{
                resolve(e);
              })
          }
        })
        .catch(e=>{
          // 获取本地数据异常，转而获取网络数据
          this.fetchNetRepository(url)
            .then(result=>{
              resolve(result);
            })
            .catch(e=>{
              resolve(e);
            })
        })
    })
  }

  /**
   * 获取本地数据
   * @param url
   * @returns {Promise}
   */
  static fetchLocalRepository(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if (!error){
          try{
            resolve(JSON.parse(result));
          }catch(e){
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }

  /**
   * 获取网络数据
   * @param url
   * @returns {Promise}
   */
  static fetchNetRepository(url){
    return new Promise((resolve,reject)=>{
      fetch(url)
        .then(response=>response.json())
        .then(result=>{
          if (!result){
            reject(new Error('responseData is null'));
            return;
          }
          resolve(result.items);
          this.saveRepository(url,result.items);
        })
        .catch(error=>{
          reject(error)
        })
    })
  }

  // 保存数据到本地AsyncStorage
  saveRepository(url,items,callBack) {
    if (!url || !items)return;
    let wrapData = {items: items, update_data: new Date().getTime()};
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  /**
   * 判断数据是否过时
   * @param longTime 数据时间戳
   * @returns {boolen}
   */

  static checkDate(longTime) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime); // 获取时间格式
    if (cDate.getMonth() !== tDate.getMonth())return false;
    if (cDate.getDay() !== tDate.getDay())return false;
    if (cDate.getHours() - tDate.getHours() > 4)return false;
    return true;
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
