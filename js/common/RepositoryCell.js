/**
 * Created by qiangxl on 20/08/2017.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class RepositoryCell extends Component{

  render(){
    return (
      <View style={{margin:10}}>
        <Text>{this.props.data.name}</Text>
        <Text>{this.props.data.description}</Text>
        <Text>{this.props.data.owner.avatar_url}</Text>
        <Text>{this.props.data.stargazers_count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

















