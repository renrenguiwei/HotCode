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

export default class Girl extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>女孩</Text>
        <Text>收到男孩的：{this.props.word}</Text>
        <Text
          onPress={()=>{
            this.props.onCallBack('巧克力');
            this.props.navigator.pop();
          }}
        >回赠巧克力</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'olive',
    // justifyContent:'center',
  }
});