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
          renderIcon={() => <Image source={require('../../res/images/ic_favorite.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_favorite.png')} style={[styles.tabImg,{tintColor:'red'}]}/>}
          selectedTitleStyle={{color:'red'}}
          badgeText="1"
          onPress={() => this.setState({selectedTab: 'home'})}>
          <View style={styles.page1}></View>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={styles.tabImg}/>}
          renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.tabImg,{tintColor:'red'}]}/>}
          selectedTitleStyle={{color:'red'}}
          onPress={() => this.setState({selectedTab: 'profile'})}>
          <View style={styles.page2}></View>
        </TabNavigator.Item>
      </TabNavigator>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

