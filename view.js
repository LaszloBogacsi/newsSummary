window.onload = function() {
  // scriptHead('notes.js');
  // scriptHead('note.js');
  heading("Jekl News");
  div('errors');
  headlinesList();
  div('full');
  // scriptBody('controller.js');

  if (findTestFile(window.location) === "testIndex.html") {
     scriptBody('test/newsFeatureSpec.js');
  }
};

function findTestFile (location){
    var filePath = location.pathname.split('/');
    var fileName = filePath[filePath.length -1];
    return fileName;
}

function heading(text) {
  var h1 = document.createElement("H1");
  var t = document.createTextNode(text);
  h1.appendChild(t);
  document.body.appendChild(h1);
}

function div(idValue) {
  var div = document.createElement('DIV');
  div.setAttribute("id", idValue);
  document.body.appendChild(div);
}

function headlinesList() {
  var ul = document.createElement('UL');
  ul.setAttribute("id", "headlines");
  document.body.appendChild(ul);
}

function scriptHead(srcValue) {
  var script = document.createElement('SCRIPT');
  script.setAttribute("src", srcValue);
  document.head.appendChild(script);
}

function scriptBody(srcValue) {
  var script = document.createElement('SCRIPT');
  script.setAttribute("src", srcValue);
  document.body.appendChild(script);
}

function addHeadlinesToList(articles) {
  articles.forEach(function(singleArticle){
    var a = document.createElement('a');
    var ul = document.getElementById("headlines");
    var li = document.createElement("li");
    var image = document.createElement("img");
    var summaryDiv = document.createElement("div");
    summaryDiv.setAttribute("id", ("div" + singleArticle.getId()));
    image.src = singleArticle.getThumbnail();
    var text = document.createTextNode(singleArticle.getWebTitle());
    a.id = singleArticle.getId();
    a.href = "#" + a.id;
    a.appendChild(text);
    li.appendChild(image);
    li.appendChild(a);
    ul.appendChild(li);
    ul.appendChild(summaryDiv);
  });
}
function summary(sentences, id){
  divId = "div" + id;
  var a = document.createElement('a');
  a.id = id;
  text = document.createTextNode("Read more");
  a.title = text;
  a.href = "#full" + a.id;
  var theDiv = document.getElementById(divId);
  theDiv.innerHTML = sentences;
  a.appendChild(text);
  theDiv.appendChild(a);
}

function showFull(fullArticleBody){
  var full = document.getElementById("full");
  full.innerHTML = fullArticleBody;
}
