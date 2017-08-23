/**
 * Created by qiangxl on 21/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// 引入组件
import CheckBox from 'react-native-check-box';

import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class CustomKeyPage extends Component{

  constructor(props){
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      dataArray:[],
    }
  }

  componentDidMount(){
    this.loadData();
  }

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

  onSave(){
    this.props.navigator.pop();
  }

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

  onClick(data){
    data.checked = !data.checked;
    this.setState({})
  }

  renderView(){

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
            ViewUtils.getLeftButton(()=>this.onSave())
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

















