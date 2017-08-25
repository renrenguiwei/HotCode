/**
 * Created by qiangxl on 22/08/2017.
 */

export default class ArrayUtils{

  /**
   * 更新数组，若item已存在则从数组中将它移除，否则添加进数组
   * 相同的数组，状态不同的时候也'==='全等是个问题
   *
   * @array 复选框最原始的状态
   * @item 点击的当前复选框
   */
  static updateArray(array,item){
    for (let i=0,len=array.length;i<len;i++){
      let temp = array[i];
      // 此处"已存储的数组元素===改变后的数据元素"有疑问，状态都不一样，怎么可以相等
      if (temp === item){
        array.splice(i,1); // 相等移除
        return;
      }
    }
    // 不包含
    array.push(item);
  }

  /**
   * 克隆一个数组
   * 这个克隆函数感觉好鸡肋，直接赋值就可以实现
   * @param from
   * @returns {Array}
   */

  static clone (from){
    if (!from) return [];
    let newArray = [];
    for (let i=0,len=from.length;i<len;i++){
      newArray[i]=from[i];
    }
    return newArray;
  }

  /**
   * 判断两个数组是否相等
   * @param arr1 arr2
   * @return {boolen} true/false
   */

  static isEqual(arr1,arr2){
    if (!(arr1&&arr2))return false;
    if (arr1.length!==arr2.length)return false;
    for (let i=0,len=arr1.length;i<len;i++){
      if(arr1[i] !== arr2[i])return false;
    }
    return true;
  }

  /**
   * 移除选中的标签
   * @param arr
   * @param item
   */

  static remove(arr,item){
    if (!arr)return; // 原数组为空
    for (let i=0,l=arr.length;i<l;i++){
      if (item===arr[i])arr.splice(i,1);
    }
  }

}




















