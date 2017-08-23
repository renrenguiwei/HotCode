/**
 * Created by qiangxl on 22/08/2017.
 */
import React,{Component} from 'react';
import {
  AsyncStorage
} from 'react-native';

// 引入组件
// 数据文件
import keys from '../../../res/data/keys.json';

export const FLAG_LANGUAGE = {flag_language:'flag_language_language',flag_key:'flag_language_key'};
export default class LanguageDao{

  // 构造函数接收值确认是 Popular还是Trending
  constructor(flag){
    this.flag = flag;
  }

  // 获取数据
  fetch(){
    // 异步存储变同步，走Promise
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(this.flag,(error,result)=>{
        if (error){
          reject(error);
        }else{
          if (result){
            try{
              resolve(JSON.parse(result));
            } catch(e){
              // 防止数据解析成对象失败，抛出错误
              reject(e);
            }
          }else{
            // 子组件传出去的值，再传回来（不知道为何需要这样的验证）
            let data = this.flag === FLAG_LANGUAGE.flag_key ? keys : null;
            this.save(data);
            resolve(data);
          }
        }
      })
    })
  }

  save(data){
    AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

    })
  }

}





















