/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
} from 'react-native';

// 引入组件
import Toast,{DURATION} from 'react-native-easy-toast';

import NavigationBar from '../common/NavigationBar';

const KEY = 'text';
export default class AsyncStorageTest extends Component{

  constructor(props){
    super(props);
  }

  save(){
    AsyncStorage.setItem(KEY,this.text,(error)=>{
      if (!error){
        this.toast.show('保存成功',DURATION.LENGTH_LONG);
      }else{
        this.toast.show('保存失败',DURATION.LENGTH_LONG);
      }
    });
  }

  get(){
    AsyncStorage.getItem(KEY,(error,result)=>{
      if (!error){
        if (result!==''&&result!==null){
          this.toast.show('取出成功：'+result,DURATION.LENGTH_LONG);
        }else{
          this.toast.show('取出为空',DURATION.LENGTH_LONG);
        }
      }else{
        this.toast.show('取出失败',DURATION.LENGTH_LONG);
      }
    });
  }

  remove(){
    AsyncStorage.removeItem(KEY,(error)=>{
      if (!error){
        this.toast.show('移除成功',DURATION.LENGTH_LONG);
      }else{
        this.toast.show('移除失败',DURATION.LENGTH_LONG);
      }
    });
  }

  render(){
    return (
      <View>
        <NavigationBar
          title={'AsyncStorage使用'}
        />

        <TextInput
          style={{borderWidth:1,height:40,margin:5}}
          onChangeText={text=>this.text=text}
        />
        <View style={{flexDirection:'row'}}>
          <Text
            onPress={()=>{
              this.save()
            }}
            style={{fontSize:20,padding:5}}
          >保存</Text>
          <Text
            onPress={()=>{
              this.get()
            }}
            style={{fontSize:20,padding:5}}
          >查看</Text>
          <Text
            onPress={()=>{
              this.remove()
            }}
            style={{fontSize:20,padding:5}}
          >移除</Text>
        </View>

        <Toast ref={toast=>this.toast=toast}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

















