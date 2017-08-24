/**
 * Created by qiangxl on 21/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

// 引入组件
import SortableListView from 'react-native-sortable-listview'

import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import ViewUtils from '../../util/ViewUtils';

export default class SortKeyPage extends Component{

  constructor(props){
    super(props);
    this.dataArray=[];          // 1、最原始的数据
    this.originCheckedArray=[]; // 2、被订阅的原始排列数据
    this.state={
      // 为什么为独把订阅后的数据用state存
      checkedArray:[],          // 3、被订阅的、重新排列后的数据
    }
    this.sortResultArray=[];    // 4、分类后重新排列的数据
  }

  componentDidMount(){
    // 实例化 languageDao 组件
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
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

  // 返回上一页
  onBack(){
    if (ArrayUtils.isEqual(this.originCheckedArray,this.state.checkedArray)){
      this.props.navigator.pop();
      return;
    }

    Alert.alert(
      "Confirm Exit",
      "Do you want to save your changes before exitting?",
      [
        {text: 'NO', onPress: ()=>this.props.navigator.pop()},
        {text: 'YES', onPress: ()=>this.onSave(true)}
      ],
      {cancelable: false}
    );

  }

  // 保存、并返回
  onSave(isChecked){
    if (!isChecked&&ArrayUtils.isEqual(this.originCheckedArray,this.state.checkedArray)){
      this.props.navigator.pop();
      return;
    }
    // 重新生成改变顺序后的数组结构
    this.getSortResult();
    this.languageDao.save(this.sortResultArray);
    this.props.navigator.pop();
  }

  getSortResult(){
    this.sortResultArray = ArrayUtils.clone(this.dataArray);  // 克隆一份老数据到新数组
    for(let i=0,l=this.originCheckedArray.length;i<l;i++){
      let item = this.originCheckedArray[i];
      let index = this.dataArray.indexOf(item);
      this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
    }
  }

  render(){
    let rightButton = <TouchableOpacity
      activeOpacity={0.6}
      onPress={()=>this.onSave()}
    >
      <View style={{margin:10}}>
        <Text style={styles.title}>Save</Text>
      </View>
    </TouchableOpacity>;

    let data = this.state.checkedArray;
    let order = Object.keys(this.state.checkedArray);
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={
            ViewUtils.getLeftButton(()=>this.onBack())
          }
          title={'Sort Key'}
          rightButton={rightButton}
        />
        <SortableListView
          style={{ flex: 1 }}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0])
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
      <TouchableHighlight
        underlayColor={'#eee'}
        style={styles.item}
        {...this.props.sortHandlers}
      >
        <View style={styles.itemLine}>
          <Image source={require('./img/ic_sort.png')} style={styles.itemImg}/>
          <Text style={styles.itemLan}>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
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
  },
  item:{
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemLine:{
    flexDirection:'row',
    alignItems:'center',
  },
  itemImg:{
    tintColor:'#000',
    width:16,
    height:16,
    marginRight:10,
  },
  itemLan:{
    color:'#343434',
  },
  title:{
    color:'#fff',
    fontSize:18,
  },
});

















