/**
 * Created by qiangxl on 21/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// 引入组件
import NavigationBar from '../../common/NavigationBar';

export default class CustomKeyPage extends Component{

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Custom Key'}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  word:{
    fontSize:18,
    margin:10
  }
});

















