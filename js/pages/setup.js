/**
 * Created by qiangxl on 20/08/2017.
 */
import React, {Component} from 'react';
import {
} from 'react-native';

// 引入组件
import CustomerComponents, {Navigator} from 'react-native-deprecated-custom-components';
import WelcomPage from './WelcomePage';
import HomePage from './HomePage';

function setup(){

  // 初始化配置
  class Root extends Component{

    renderScene(route,navigator){
      let Component = route.component;
      return <Component navigator={navigator} {...route.params}/>;
    }

    render(){
      return(
        <Navigator
          initialRoute={{component:HomePage}}
          renderScene={(route,navigator)=>this.renderScene(route,navigator)}
        />
      );
    }

  }
  return <Root/>

}
module.exports = setup;