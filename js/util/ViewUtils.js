/**
 * Created by qiangxl on 22/08/2017.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

export default class ViewUtils{

  static getLeftButton(callBack){
    return (
      <TouchableOpacity
        // 这处函数回调真是高，解决了封装组件不能自定义事件操作的bug
        onPress={callBack}
      >
        <Image style={{width:22,height:22,margin:5,}} source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
      </TouchableOpacity>
    );
  }

}