/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

// 引入外部包
import TabNavigator from 'react-native-tab-navigator';
import Toast,{DURATION} from 'react-native-easy-toast';

import Girl from './girl';
import AsyncStorageTest from './AsyncStorageTest';
import PopularPage from './PopularPage';
import MyPage from './my/MyPage';

export default class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home'
    };
  }

  // Toast事件发射器
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
      this.toast.show(text,DURATION.LENGTH_LONG);
    });
  }

  // 组件被修改的时候，把上面的监听移除掉
  componentWillUnmount(){
    this.listener&&this.listener.remove();
  }

  render() {
    return (
      <View style={{flex:1,}}>
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.tabImg,{tintColor:'black'}]}/>}
          selectedTitleStyle={{color:'black'}}
          onPress={() => this.setState({selectedTab: 'home'})}>
          <PopularPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'trending'}
          title="trending"
          renderIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={[styles.tabImg,{tintColor:'black'}]}/>}
          selectedTitleStyle={{color:'black'}}
          onPress={() => this.setState({selectedTab: 'trending'})}>
          <AsyncStorageTest/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'favorite'}
          title="favorite"
          renderIcon={() => <Image source={require('../../res/images/ic_favorite.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_favorite.png')} style={[styles.tabImg,{tintColor:'black'}]}/>}
          selectedTitleStyle={{color:'black'}}
          onPress={() => this.setState({selectedTab: 'favorite'})}>
          <Girl/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'my'}
          title="my"
          renderIcon={() => <Image source={require('../../res/images/ic_my.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_my.png')} style={[styles.tabImg,{tintColor:'black'}]}/>}
          selectedTitleStyle={{color:'black'}}
          onPress={() => this.setState({selectedTab: 'my'})}>
          <MyPage {...this.props}/>
        </TabNavigator.Item>
      </TabNavigator>
      <Toast ref={toast=>this.toast=toast} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabImg: {
    width:28,
    height:28,
  },
});

