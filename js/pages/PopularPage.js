/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';

// 引入组件
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

import DataRepository from '../expand/dao/DataRepository';
import NavigationBar from '../common/NavigationBar';
import RepositoryCell from '../common/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {'Popular'}
        />

        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar/>}
        >
          <PopularTab tabLabel="React" />
          <PopularTab tabLabel="Flow" />
          <PopularTab tabLabel="Jest" />
          <PopularTab tabLabel="Go" />
        </ScrollableTabView>

      </View>
    );
  }
}

// 渲染子组件
class PopularTab extends Component{

  constructor(props){
    super(props);
    this.state = {
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2}),
    };
  }

  componentDidMount(){
    this.onLoad();
  }

  onLoad(){
    const key = URL+this.props.tabLabel+QUERY_STR;
    DataRepository.get(key)
      .then(result=>{
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(result.items),
        })
      })
      .catch(error=>{
          console.error(error)
      })
  }

  // 渲染ListView数据
  renderRow(data){
    return (
      <RepositoryCell data={data}/>   // 封装单独渲染组件
    );
  }

  render(){
    return (
      <View>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(data) => this.renderRow(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    flexDirection:'column',
  },
  text:{
    fontSize:18,
    margin:5,
  },
  textInput:{
    height:40,
    borderWidth:0.5,
    borderColor:'#ccc',
  },
});

















