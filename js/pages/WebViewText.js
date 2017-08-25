/**
 * Created by qiangxl on 17/08/2017.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  WebView,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';

// 引入组件
import NavigationBar from '../common/NavigationBar';

const URL = 'http://www.imooc.com/';
export default class WebViewText extends Component{

  constructor(props){
    super(props);
    this.state = {
      url:URL,
      title:'',
      canBack:false,
    };
  }

  onBack(){
    if (this.state.canBack){
      this.webView.goBack();
    }else{
      DeviceEventEmitter.emit('showToast','到顶喽！');
    }
  }

  go(){
    this.setState({
      url:this.text,
    });
  }

  onNavigationStateChange(e){
    this.setState({
      url:e.url,
      title:e.title,
      canBack:e.canGoBack,
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'WebView'}
        />
        <View style={styles.wvTop}>
          <Text
            style={styles.tips}
            onPress = {()=>{
              this.onBack();
            }}
          >Back</Text>
          <TextInput
            style={styles.input}
            defaultValue={URL}
            onChangeText={text=>this.text=text}
          />
          <Text
            style={styles.tips}
            onPress = {()=>{
              this.go();
            }}
          >Go</Text>
        </View>
        <WebView
          style={styles.webView}
          ref={webView=>this.webView=webView}
          onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  wvTop:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.5,
    borderColor:'gray',
    marginTop:5,
  },
  tips:{
    fontSize:20,
    margin:10,
  },
  input:{
    flex:1,
    borderWidth:1,
    height:40,
  },
});