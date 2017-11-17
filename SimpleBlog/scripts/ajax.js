function ajax(type,url,data,callback) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp=new XMLHttpRequest();
  } else {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      callback(JSON.parse(xmlhttp.responseText));
    }
  }
  xmlhttp.open(type,url,true);
  xmlhttp.send(data);
}