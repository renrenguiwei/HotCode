/**
 * Created by qiangxl on 22/08/2017.
 */

export default class ArrayUtils{

  /*
   * 更新数组，若item已存在则从数组中将它移除，否则添加进数组
   * 相同的数组，状态不同的时候也'==='全等是个问题
   *
   * @ array 复选框最原始的状态
   * @ item 点击的当前复选框
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
}