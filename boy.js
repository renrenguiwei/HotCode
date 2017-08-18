/**
 * Created by qiangxl on 17/08/2017.
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View
} from 'react-native';

// 引入组件
import Girl from './girl';
import NavigationBar from './NavigationBar';

export default class Boy extends Component{

  constructor(props){
    super(props);
    this.state = {
      word:'',
    };
  }

  render(){

    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Boy'}
        />
        <Text>男孩</Text>
        <Text
          onPress={()=>{
            this.props.navigator.push({
              component:Girl,
              props:{
                word:'一束玫瑰花',
                onCallBack:(word)=>{
                  this.setState({
                    word:word
                  });
                }

              }
            });
          }}
        >送给女孩花</Text>
        <Text>收到回礼:{this.state.word}</Text>
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'green',
    // justifyContent:'center',
  }
});
