let tid=null;
export function debounce(fn,wait){
  //设定默认的延迟时间
  wait=wait||500;
  //清除定时器
  tid && clearTimeout(tid);
  //定时器执行
  tid=setTimeout(fn,wait);
}
