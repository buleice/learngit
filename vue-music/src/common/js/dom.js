/**
 * dom操作
 */


//判断当前节点 是否包含某个css
export function hasClass(el, className) {
  //判断是否拥有class
  let reg = new RegExp('(^|\\s)' +
    className + '(\\s|$)')
  return reg.test(el.className)
}

//给节点添加css
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  //将每个class分成数组
  let newClass = el.className.split(' ')
  //添加class
  newClass.push(className)
  //转化为class
  el.className = newClass.join(' ')

}

/**
 * 写节点属性 以及 获取节点属性的方式
 */
export function getData(el,name,val){
  let prefix = "data-"
  let prefixname = prefix + name;
  //如果val传入 那么则是 给节点 写某个属性并且返回
  if(val){
    return el.setAttribute(prefixname,val);
  }
  //如果 val没有传 则是 获取某个属性
  return el.getAttribute(prefixname);
}

//来判断 目前你是什么浏览器来进行登陆的 并且分别加入各个厂商的前缀
let elementCreateStyle = document.createElement('div').style;

let ventor = (()=>{
  let transformNames = {
    webkit:'webkitTransform',
    O:"OTransform",
    ms:"msTransform",
    Moz:"MozTransform",
    standrad:'transform'
  }
  for(let key in transformNames){
    //目前在哪个浏览器运行的 用来判断
    if(elementCreateStyle[transformNames[key]]!=="undefined"){
      return key
    }
  }
  return false
})();

export  function  prefixStyle(style){
  if(ventor === false){
    //浏览器有问题 兼容不到 相关浏览器
    return
  }
  if(ventor === "standrad"){
    return style
  }
  return  ventor + style.charAt(0).toUpperCase() + style.substr(1);
}
