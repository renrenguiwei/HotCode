/**
 * Created by qiangxl on 18/08/2017.
 */

import React,{Component,PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 40;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape = {
  backgroundColor:PropTypes.string,
  // oneOf 属性取值为几个特定值
  barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
  hidden:PropTypes.bool,
};

export default class NavigationBar extends Component{

  static propTypes = {
    title:PropTypes.string,
    titleView:PropTypes.element,  // 属性是react某个元素
    hide:PropTypes.bool,
    leftButton:PropTypes.element,
    rightButton:PropTypes.element,
    statusBar:PropTypes.shape(StatusBarShape),  // 属性是指定构成方式对象
  }

  // 默认props不起作用
  // static defaultProps = {
  //   statusBar:{
  //     backgroundColor:'red',
  //     barStyle:'light-content',
  //     hidden:false,
  //   }
  // };

  constructor(props){
    // 初始化父类构造函数
    super(props);
    this.state = {

    };
  }

  render(){
    let status = <View style={[styles.statusBar,this.props.statusBar]}>
      <StatusBar {...this.props.statusBar}/>
    </View>;
    let titleView = this.props.titleView?this.props.titleView:
      <Text style={styles.title}>{this.props.title}</Text>;
    let content = <View style={styles.navBar}>
      {this.props.leftButton}
      <View style={styles.titleViewContainer}>{titleView}</View>
      {this.props.rightButton}
    </View>;
    return (
      <View style={styles.container}>
        {status}
        {content}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    // 整体
    backgroundColor:'#ccc',
  },
  statusBar:{
    // 状态栏
    backgroundColor:'#fff',
    height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
  },
  navBar:{
    // 导航栏
    backgroundColor:'#ccc',
    justifyContent:'space-between',
    alignItems:'center',
    height:Platform.OS == 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
    flexDirection:'row',
  },
  titleViewContainer:{
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',  // *定位样式给容器赋予大小*
    left:40,
    right:40,
    top:0,
    bottom:0,
  },
  title:{
    fontSize:20,
    color:'#fff',
  },
});












