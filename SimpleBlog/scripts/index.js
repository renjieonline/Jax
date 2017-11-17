
var container = document.getElementById("container");
container.addEventListener("mouseover", function(ev){
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if(target.nodeName.toLowerCase() === 'section'){
    console.log(target.nextElementSibling);
    target.nextElementSibling.style.visibility = "visible";
  }
});

container.addEventListener("click", function(ev){
  var ev = ev || window.event;
  var target = ev.target || ev.srcElement;
  if(target.nodeName.toLowerCase() === 'button'){
    var section = target.parentElement.children[0];
    var image = section.children[0].src;
    var title = section.children[1].innerHTML;
    var content = section.children[2].innerHTML;
    showArticleBox("Edit",image,title,content);
  }
});

var addButton = document.getElementById("addButton");
addButton.addEventListener("click", function(ev){
  showArticleBox("Edit","","","");
});

window.onload = function() {
  ajax("GET", "db.json","", function(data) {
    console.log(data);
	var articles = data.articles;
	for (var i=0, len=articles.length; i<len; i++) {
	  var article = createArticle(articles[i]);
	  var container = document.getElementById("container");
	  container.appendChild(article);
	}
  });
}

function createArticle (article) {
  var div = document.createElement("div");
  div.setAttribute("class", "article");
  var section = document.createElement("section");
  var img = document.createElement("img");
  img.src = article.image;
  var h1 = document.createElement("h1");
  h1.innerHTML = article.title;
  var p = document.createElement("p");
  p.setAttribute("class", "content");
  p.innerHTML = article.content;
  var button = document.createElement("button");
  button.setAttribute("class", "edit");
  button.innerHTML = "Edit";
  
  section.appendChild(img);
  section.appendChild(h1);
  section.appendChild(p);
  div.appendChild(section);
  div.appendChild(button);
  
  return div;
}