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
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// 引入组件
import CheckBox from 'react-native-check-box';

import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';

export default class CustomKeyPage extends Component{

  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.changeValues = []; // 存储改变后的数据
    this.state = {
      dataArray:[],
    }
  }

  componentDidMount(){
    this.loadData();
  }

  // 加载静态数据文件或本地存储
  loadData(){
    this.languageDao.fetch()
      .then(result=>{
        this.setState({
          dataArray:result
        })
      })
      .catch(error=>{
        console.error(error)
      })
  }

  // 保存键
  onSave(){
    // 有改变存到AsyncStorgae内
    if (this.changeValues.length!==0){
      this.languageDao.save(this.state.dataArray);
    }

    // 有、没有改变都返回上一页
    this.props.navigator.pop();
  }

  // 返回键
  onBack(){
    if (this.changeValues.length!==0){
      Alert.alert(
        "Confirm Exit",
        "Do you want to save your changes before exitting?",
        [
          {text: 'NO', onPress: ()=>this.props.navigator.pop()},
          {text: 'YES', onPress: ()=>this.onSave()}
        ],
        {cancelable: false}
      );
    }else{
      this.props.navigator.pop();
    }
  }

  // 渲染单个复选框
  renderCheckBox(data){
    let leftText = data.name;
    return (
      <CheckBox
        style={{flex:1,padding:10}}
        onClick={()=>this.onClick(data)}
        isChecked={data.checked}
        leftText={leftText}
        checkedImage={<Image source={require('./img/ic_check_box.png')} style={{tintColor:'#000'}}/>}
        unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')} style={{tintColor:'#000'}}/>}
      />
    );
  }

  // 点击复选框
  onClick(data){
    data.checked = !data.checked;
    this.setState({})  // 应付复选框不可改变的BUG

    ArrayUtils.updateArray(this.changeValues,data);
  }

  renderView(){

    // 复选框从静态数据中遍历显示
    if (!this.state.dataArray||this.state.dataArray.length===0) return null;
    let views = [];
    let len = this.state.dataArray.length;
    for (let i=0,l=len-2;i<l;i+=2){
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i+1])}
          </View>
          <View style={styles.line}></View>
        </View>
      )
    }
    // 剩下的2个或1个
    views.push(
      <View key={len-1}>
        <View style={styles.item}>
          {len%2===0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
          {this.renderCheckBox(this.state.dataArray[len-1])}
        </View>
        <View style={styles.line}></View>
      </View>
    )
    return views;
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
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={
            ViewUtils.getLeftButton(()=>this.onBack())
          }
          title={'Custom Key'}
          rightButton={rightButton}
        />
        <ScrollView>
          {this.renderView()}
        </ScrollView>
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
  },
  title:{
    color:'#fff',
    fontSize:20,
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
  },
  line:{
    height:0.3,
    backgroundColor:'#ccc',
  }
});

















