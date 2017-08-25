/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';

// 引入组件
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

import DataRepository from '../expand/dao/DataRepository';
import NavigationBar from '../common/NavigationBar';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


export default class PopularPage extends Component{

  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    // this.dataRepository = new DataRepository();
    // popular页显示的语言
    this.state = {
      language:[],
    };
  }

  componentDidMount(){
    this.loadData();
  }

  // 加载静态数据文件或本地存储
  loadData(){
    this.languageDao.fetch()
      .then(result=>{
        this.setState({
          language:result
        })
      })
      .catch(error=>{
        console.error(error)
      })
  }

  render(){
    // 解决ScrollableTab因不能提前计算出language长度，直接渲染闪烁BUG；所以先计算出长度，再渲染
    let content = this.state.language.length>0?
      <ScrollableTabView
        tabBarBackgroundColor='#000'
        tabBarInactiveTextColor='mintcream'
        tabBarActiveTextColor='#fff'
        tabBarUnderlineStyle={{
          backgroundColor:'#e7e7e7',
          height:2,
        }}
        renderTabBar={() => <ScrollableTabBar/>}
      >
        {/*
         map方法遍历language数组，arr新数组（大概明白这个函数的意思）
         */}
        {this.state.language.map((reuslt, i, arr)=>{
          let lan = arr[i];
          return lan.checked ? <PopularTab tabLabel={lan.name} {...this.props}/>:null;
        })}
      </ScrollableTabView>:null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {'Popular'}
        />
        {content}
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
      onLoading:false,
    };
  }

  componentDidMount(){
    this.onLoad();
  }

  onLoad(){
    this.setState({
      onLoading:true,
    });
    let url = URL+this.props.tabLabel+QUERY_STR;
    DataRepository
      .fetchRepository(url)
      .then(result=>{
        // 判断result取回的值
        let items = result&&result.items?result.items:result?result:[];
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(items),
          onLoading:false,
        })
        // 数据过期，做网络请求
        // result.update_data永远无法获取到，导致数据只做缓存文件读取，不更新过时数据
        if (result&&result.update_data&&!DataRepository.checkDate(result.update_data)){
          DeviceEventEmitter.emit('showToast','数据过时');
          return DataRepository.fetchNetRepository(url);
        }else{
          DeviceEventEmitter.emit('showToast','显示缓存数据');
        }
      })
      .then(items=>{
        if (!items||items.length===0)return;
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(items),
        })
        DeviceEventEmitter.emit('showToast','显示网络数据');
      })
      .catch(error=>{
          console.error(error)
      })
  }

  onSelect(data){
    this.props.navigator.push({
      component:RepositoryDetail,
      params:{
        item:data,
        ...this.props,
      }
    });
  }

  // 渲染ListView数据
  renderRow(data){
    return (
      <RepositoryCell
        key={data.id}
        data={data}
        onSelect={()=>this.onSelect(data)}
      />   // 封装单独渲染组件
    );
  }

  render(){
    return (
      <View style={{flex:1}}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(data) => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.onLoading}
              onRefresh={()=>this.onLoad()}
              colors={['#000']}
              tintColor={'#000'}
              title={'Loading...'}
              titleColor={'#000'}
            />
          }
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

















