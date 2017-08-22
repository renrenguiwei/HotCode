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
  View
} from 'react-native';

// 引入外部包
import TabNavigator from 'react-native-tab-navigator';

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

  render() {
    return (

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

