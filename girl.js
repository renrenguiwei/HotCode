/**
 * Created by qiangxl on 17/08/2017.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

// 引入组件
import NavigationBar from './NavigationBar';

export default class Girl extends Component{

  constructor(props){
    super(props);
  }

  // 导航栏按钮点击
  renderButton(image){
    return (
      <TouchableOpacity
        onPress={()=>{
          this.props.navigator.pop();
        }}
      >
        <Image style={{width:22,height:22,margin:5,}} source={image}/>
      </TouchableOpacity>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{
            backgroundColor:'#ef6d79'
          }}
          leftButton={
            this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
          }
          title={'Girl'}
          rightButton={
            this.renderButton(require('./res/images/ic_star.png'))
          }
        />
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
    // backgroundColor:'olive',
    // justifyContent:'center',
  }
});