/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

// 引入组件
import DataRepository from '../expand/dao/DataRepository';
import NavigationBar from '../common/NavigationBar';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      result:'',
    };
  }

  onLoad(){
    const key = URL+this.text+QUERY_STR;
    DataRepository.get(key)
      .then(result=>{
        this.setState({
          result:JSON.stringify(result)
        })
      })
      .catch(error=>{
        this.setState({
          result:JSON.stringify(error)
        })
      })
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationBar
          title = {'Popular'}
        />
        <View>
          <Text
            style={styles.text}
            onPress={()=>{
              this.onLoad();
            }}
          >获取数据</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text=>this.text=text}
          />
          <Text style={styles.result}>Obtain:{this.state.result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#669999',
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
  result:{
    height:200
  }
});