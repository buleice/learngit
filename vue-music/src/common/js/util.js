

/**
 * 算法 打乱数组
 * @param list
 */
export  const shuffle= (list)=> {
  let newlist = list.slice();
  let currentVal;
  for(let i=0;i<newlist.length;i++){
    let randomKey =Math.floor(Math.random() * newlist.length);
    currentVal = newlist[randomKey];
    newlist[randomKey] = newlist[i];
    newlist[i] = currentVal;
  }
  return newlist;
}
/**
 * 数据节流
 */
export function debounce(hangler,delay){
  let timer;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      //执行方法
      hangler.apply(this,args)
    },delay)
  }
}
