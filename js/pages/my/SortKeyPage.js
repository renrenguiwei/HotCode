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
import SortableListView from 'react-native-sortable-listview'

import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';

export default class SortKeyPage extends Component{

  constructor(props){
    super(props);
    // 实例化 languageDao 组件
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.dataArray=[];          // 1、最原始的数据
    this.originCheckedArray=[]; // 2、被订阅的原始排列数据
    this.state={
      // 为什么为独把订阅后的数据用state存
      checkedArray:[],          // 3、被订阅的、重新排列后的数据
    }
    this.sortResultArray=[];    // 4、分类后重新排列的数据
  }

  componentDidMount(){
    this.loadData();
  }

  // 加载静态数据文件或本地存储
  loadData(){
    this.languageDao.fetch()
      .then(result=>{
        this.getCheckedItems(result);
      })
      .catch(error=>{
        console.error(error)
      })
  }

  // 获取订阅的数组
  getCheckedItems(result){
    this.dataArray = result;
    let checkedArray = [];
    for (let i=0,len=result.length;i<len;i++){
      let data = result[i];
      // 是checked就存
      if (data.checked)checkedArray.push(data);
    }
    // 再存state
    this.setState({
      checkedArray:checkedArray
    });

    this.originCheckedArray = ArrayUtils.clone(checkedArray);
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'My'}
        />
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            order.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    );
  }
}

class SortCell extends Component{
  render(){
    return (
      <View>
        <Text>{this.props.data.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
  },
  word:{
    fontSize:18,
    margin:10
  }
});

















