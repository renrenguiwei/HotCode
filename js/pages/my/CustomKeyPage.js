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
import ViewUtils from '../../util/ViewUtils';

export default class CustomKeyPage extends Component{

  onSave(){
    this.props.navigator.pop();
  }

  render(){
    let rightButton = <TouchableOpacity
      activeOpacity={0.6}
      onPress={()=>this.onSave()}
    >
      <View style={{margin:10}}>
        <Text style={styles.title}>Save</Text>
      </View>
    </TouchableOpacity>;
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={
            ViewUtils.getLeftButton(()=>this.onSave())
          }
          title={'Custom Key'}
          rightButton={rightButton}
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
  },
  title:{
    color:'#fff',
    fontSize:20,
  }
});

















