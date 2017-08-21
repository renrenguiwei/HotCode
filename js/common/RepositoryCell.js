/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class RepositoryCell extends Component{

  render(){
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View style={styles.containerInner}>
          <Text style={styles.authorName}>{this.props.data.name}</Text>
          <Text style={styles.desc}>{this.props.data.description}</Text>

          <View style={styles.author_starNum_starImg}>

            <View style={styles.ass_bottomBlock}>
              <Text style={styles.author_word}>Author:</Text>
              <Image source={{uri:this.props.data.owner.avatar_url}} style={styles.authorImg}/>
            </View>

            <View style={styles.ass_bottomBlock}>
              <Text style={styles.author_word}>Stars:</Text>
              <Text style={styles.author_word}>{this.props.data.stargazers_count}</Text>
            </View>

            <Image source={require('../../res/images/ic_unstar_transparent.png')} style={styles.starImg}/>

          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  containerInner:{
    padding:10,
    backgroundColor:'white',
    marginLeft:5,
    marginRight:5,
    marginVertical:3,
    borderWidth:0.5,
    borderRadius:2,

  },
  authorName:{
    color:'#212121',
    fontSize:16,
    marginBottom:2,
  },
  desc:{
    fontSize:14,
    marginBottom:2,
    color:'#757575',
  },
  author_starNum_starImg:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  ass_bottomBlock:{
    flexDirection:'row',
    alignItems:'center',
  },
  author_word:{
    color:'#737373',
  },
  authorImg:{
    width:22,
    height:22,
  },
  starImg:{
    width:22,
    height:22,
  },
});

















