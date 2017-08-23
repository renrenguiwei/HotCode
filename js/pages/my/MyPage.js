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
import CustomKeyPage from './CustomKeyPage';

export default class MyPage extends Component{

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'My'}
        />
        <TouchableOpacity
          activeOpacity={0.6}
        >
          <Text
            style={styles.word}
            onPress={()=>{
              this.props.navigator.push({
                component:CustomKeyPage,
                params:{...this.props}
              })
            }}
          >进入自定义标签页</Text>
        </TouchableOpacity>
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

















