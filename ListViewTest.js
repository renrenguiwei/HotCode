/**
 * Created by qiangxl on 19/08/2017.
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

// 引入组件
import NavigationBar from './NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
let data = {
  "result":[
    {
      'email':'clauswong1@gmail.com',
      'fullName':'clauswong1',
    },
    {
      'email':'clauswong2@gmail.com',
      'fullName':'clauswong2',
    },
    {
      'email':'clauswong3@gmail.com',
      'fullName':'clauswong3',
    },
    {
      'email':'clauswong4@gmail.com',
      'fullName':'clauswong4',
    },
    {
      'email':'clauswong5@gmail.com',
      'fullName':'clauswong5',
    },
    {
      'email':'clauswong6@gmail.com',
      'fullName':'clauswong6',
    },
    {
      'email':'clauswong7@gmail.com',
      'fullName':'clauswong7',
    },
    {
      'email':'clauswong8@gmail.com',
      'fullName':'clauswong8',
    },
  ]
};

export default class ListViewTest extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
    this.state = {
      dataSource:ds.cloneWithRows(data.result),
      onLoading:true,
    }
    // 构造函数调用刷新控制
    this.onRefresh();
  }

  // 渲染每一行内容
  renderRow(item){
    return (
      <View style={styles.row}>
        <TouchableOpacity
          onPress={()=>{
            this.toast.show(item.email,DURATION.LENGTH_SHORT);
          }}
        >
          <Text style={styles.tips}>{item.email}</Text>
          <Text style={styles.tips}>{item.fullName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // 返回每一行分隔视图(一条线)
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return (
      <View style={styles.line}></View>
    );
  }
  // 返回ListView末尾
  renderFooter(){
    return (
      <Image style={{width:300,height:150,}} source={{uri:'https://placehold.it/400x200'}}/>
    );
  }
  // 刷新控制
  onRefresh(){
    setTimeout(()=>{
      this.setState({
        onLoading:false,
      });
    },2000);
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'ListView'}
        />
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(item) => this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          renderFooter={()=>this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.onLoading}
              onRefresh={this.onRefresh()}
            />
          }
        />
        <Toast ref={toast=>this.toast=toast}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tips:{
    fontSize:16,
  },
  row:{
    height:50,
  },
  line:{
    height:1,
    backgroundColor:'#ccc',
  }
});













