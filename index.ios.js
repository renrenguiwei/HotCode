/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

// 1、引入外部包
import TabNavigator from 'react-native-tab-navigator';
import CustomerComponents, {Navigator} from 'react-native-deprecated-custom-components';
// 2、引入组件
import Boy from './boy.js';
// 3、屏蔽掉黄色警告
console.disableYellowBox = true;

export default class HotCode extends Component {

  constructor(props){
    super(props);
    // this.state = {
    //   selectedTab:'home'
    // };
  }

  render() {
    return (

      <Navigator
        initialRoute = {{
          component:Boy,
        }}
        renderScene = {(route,navigator)=>{
          return <route.component navigator={navigator} {...route.props}/>;
        }}
      />

      //
      // <TabNavigator>
      //   <TabNavigator.Item
      //     selected={this.state.selectedTab === 'home'}
      //     title="Home"
      //     renderIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={styles.tabImg}/>}
      //     renderSelectedIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={[styles.tabImg,{tintColor:'red'}]}/>}
      //     selectedTitleStyle={{color:'red'}}
      //     badgeText="1"
      //     onPress={() => this.setState({selectedTab: 'home'})}>
      //     <View style={styles.page1}></View>
      //   </TabNavigator.Item>
      //   <TabNavigator.Item
      //     selected={this.state.selectedTab === 'profile'}
      //     title="Profile"
      //     renderIcon={() => <Image source={require('./res/images/ic_polular.png')} style={styles.tabImg}/>}
      //     renderSelectedIcon={() => <Image source={require('./res/images/ic_polular.png')} style={[styles.tabImg,{tintColor:'red'}]}/>}
      //     selectedTitleStyle={{color:'red'}}
      //     onPress={() => this.setState({selectedTab: 'profile'})}>
      //     <View style={styles.page2}></View>
      //   </TabNavigator.Item>
      // </TabNavigator>
      //



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },

  /*
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  page1:{
    flex:1,
    backgroundColor:'green',
  },
  page2:{
    flex:1,
    backgroundColor:'olive',
  },
  tabImg:{
    width:28,
    height:28,
  },
  tabImgActive:{
    color:'red',
  }
  */

});

AppRegistry.registerComponent('HotCode', () => HotCode);
