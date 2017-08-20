/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

// 引入组件
import NavigationBar from '../common/NavigationBar';
import HomePage from './HomePage';

export default class WelcomePage extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.timer = setTimeout(()=>{
      this.props.navigator.resetTo({
        component:HomePage,
      });
    },2000);
  }
  componentWillUnmount(){
    // 页面卸载的时候，卸载掉计时器以免报错
    // this.time存在就卸载（语法真特么简单）
    this.timer&&clearTimeout(this.timer);
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {'Welcome'}
        />
        <View>
          <Text>Welcome Back!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#669999',
  },
});