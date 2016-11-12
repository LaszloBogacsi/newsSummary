makeURLRenderSummary();

function makeURLRenderSummary() {
  window.addEventListener("hashchange", getArticleIdForCurrentPage);
}

function getArticleIdForCurrentPage () {
  showSummary(getArticleIdFromUrl(window.location));
}

function getArticleIdFromUrl (location) {
  return location.hash.split("#")[1];
}

function showSummary(id) {
  articles.getSummaryText(id, summary);
}
function summary(sentences, id){
  divId = "div" + id;
  document.getElementById(divId).innerHTML = sentences;
}
