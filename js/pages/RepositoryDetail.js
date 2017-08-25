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
import ViewUtils from '../util/ViewUtils';

const URL = 'http://www.imooc.com/';
export default class RepositoryDetail extends Component{

  constructor(props){
    super(props);
    let url = this.props.item.html_url;
    let title = this.props.item.full_name;
    this.state = {
      url:url,
      title:title,
      canBack:false,
    };
  }

  onBack(){
    if (this.state.canBack){
      this.webView.goBack();
    }else{
      // DeviceEventEmitter.emit('showToast','到顶喽！');
      this.props.navigator.pop();
    }
  }

  go(){
    this.setState({
      url:this.text,
    });

    DeviceEventEmitter.emit('showToast',this.state.url);
  }

  onNavigationStateChange(e){
    this.setState({
      url:e.url,
      // title:e.title, // webview的title用列表页短name，网页title太长
      canBack:e.canGoBack,
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.title}
          leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
        />
        <WebView
          style={styles.webView}
          ref={webView=>this.webView=webView}
          onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
          source={{uri: this.state.url}}
          startInLoadingState={true}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
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