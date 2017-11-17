function showArticleBox (type, image, title, content){ 
  var boxWidth = 400; 
  var boxHeight = 500; 
  var titleHeight = 25;
  var borderColor = "DDDDDD";
  var titleColor = "#FFFFFF"; 
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  
  var bgObj=document.createElement("div");
  bgObj.setAttribute('id','bgDiv'); 
  bgObj.style.position = "absolute"; 
  bgObj.style.top = "0"; 
  bgObj.style.background = "#777"; 
  bgObj.style.opacity = "0.6"; 
  bgObj.style.left = "0"; 
  bgObj.style.width = screenWidth + "px"; 
  bgObj.style.height = screenHeight + "px"; 
  bgObj.style.zIndex = "10000"; 
  document.body.appendChild(bgObj);

  var boxObj=document.createElement("div");
  boxObj.setAttribute("id","boxObj"); 
  boxObj.style.background = "white"; 
  boxObj.style.border = "1px solid " + borderColor; 
  boxObj.style.position = "absolute"; 
  boxObj.style.left = "50%"; 
  boxObj.style.top = "30%";  
  boxObj.style.marginLeft = "-225px" ; 
  boxObj.style.marginTop = -75 + document.documentElement.scrollTop + "px"; 
  boxObj.style.width = boxWidth + "px"; 
  boxObj.style.height = boxHeight + "px"; 
  boxObj.style.padding = "10px 30px"; 
  boxObj.style.zIndex = "10001"; 
  
  var boxName = document.createElement("h3");
  boxName.setAttribute("id","boxName"); 
  boxName.innerHTML = type + " Article"; 
  
  var labelImage= document.createElement("lable");
  labelImage.setAttribute("id","labelImage"); 
  labelImage.innerHTML = "Image";

  var inputImage= document.createElement("input");
  inputImage.setAttribute("id","inputImage"); 
  inputImage.style.display = "inline-block";
  inputImage.style.width = "100%";
  inputImage.value = image;  
  
  var labelTitle = document.createElement("label");
  labelTitle.setAttribute("id","labelTitle"); 
  labelTitle.innerHTML = "Title";

  var inputTitle= document.createElement("input");
  inputTitle.setAttribute("id","inputTitle"); 
  inputTitle.style.display = "inline-block";
  inputTitle.style.width = "100%";
  inputTitle.value = title; 
  
  var labelContent = document.createElement("label");
  labelContent.setAttribute("id","labelContent"); 
  labelContent.innerHTML = "Content";  
  
  var inputContent= document.createElement("div");
  inputContent.setAttribute("id","inputContent"); 
  inputContent.style.width = "100%";
  inputContent.style.height = "100px";
  inputContent.style.border = "1px solid " + borderColor;
  inputContent.style.overflow = "scroll";
  inputContent.innerHTML = content;
    
  var saveObj = function(){
	var article = {};
    article.image = document.getElementById("inputImage").value;
    article.title = document.getElementById("inputTitle").value;
	article.content = document.getElementById("inputContent").innerHTML; 
    ajax("POST", "db.json", article, function(data) {
		console.log("The article saved!")
	});
	document.body.removeChild(bgObj);
    document.body.removeChild(boxObj);
  } 
  
  var saveButton = document.createElement("button");
  saveButton.innerHTML = "Save"; 
  saveButton.style.position = "absolute"; 
  saveButton.style.left = "50%"; 
  saveButton.style.bottom = "10px"; 
  saveButton.style.backgroundColor = "#006741";
  saveButton.style.color = "white"; 
  saveButton.onclick = saveObj; 
  
    
  var removeObj = function(){
    document.body.removeChild(bgObj);
    document.body.removeChild(boxObj);
  } 
  
  var cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Cancel"; 
  cancelButton.style.position = "absolute"; 
  cancelButton.style.left = "70%"; 
  cancelButton.style.bottom = "10px"; 
  cancelButton.style.color = "#777"; 
  cancelButton.onclick = removeObj; 


  document.body.appendChild(boxObj);
  document.getElementById("boxObj").appendChild(boxName);
  boxObj.appendChild(labelImage);
  boxObj.appendChild(inputImage);
  boxObj.appendChild(labelTitle);
  boxObj.appendChild(inputTitle);
  boxObj.appendChild(labelContent);
  boxObj.appendChild(inputContent);  
  boxObj.appendChild(saveButton);
  boxObj.appendChild(cancelButton);
} 