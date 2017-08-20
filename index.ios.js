/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';
// 引入组件
import setup from './js/pages/setup';

// 屏蔽掉黄色警告
console.disableYellowBox = true;
AppRegistry.registerComponent('HotCode', () => setup);
