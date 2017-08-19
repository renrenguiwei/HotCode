/**
 * Created by qiangxl on 19/08/2017.
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

// 引入组件
import NavigationBar from './NavigationBar';

export default class FetchTest extends Component{

  constructor(props){
    super(props);
    this.state = {
      result:'',
    };
  }

  onLoad(url){
    fetch(url)
        .then(response=>response.json())
        .then(result=>{
          this.setState({
            result:JSON.stringify(result)
          });
        })
        .catch(error=>{
          this.setState({
            result:JSON.stringify(error)
          });
        })
  }
  onSubmit(url,data){
    fetch(url,{
      method:'POST',
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data) // 对象->字符串
    })
        .then(response=>response.json())
        .then(result=>{
          this.setState({
            result:JSON.stringify(result)
          });
        })
        .catch(error=>{
          this.setState({
            result:JSON.stringify(error)
          });
        })
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Fetch请求'}
        />
        <Text
          onPress={()=>{
            this.onLoad('http://rap.taobao.org/mockjsdata/11793/test');
          }}
        >获取数据</Text>
        <Text
          onPress={()=>{
            this.onSubmit(
              'http://rap.taobao.org/mockjsdata/11793/submit',
              {
                userName:'扶桑',
                password:'9527',
              }
            );
          }}
        >提交数据</Text>
        <Text>Obtain:{this.state.result}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  containter:{
    flex:1,
  },
});











