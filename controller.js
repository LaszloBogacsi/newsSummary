makeURLRenderSummary();

function makeURLRenderSummary() {
  window.addEventListener("hashchange", getArticleIdForCurrentPage);
}

function getArticleIdForCurrentPage () {
  id = getArticleIdFromUrl(window.location);
  if (isIdFullArticle(id) === true) {
    fullId = id.slice(4);
    console.log(fullId);
    showFullArticle(fullId);
  } else {
    console.log("hellosummary");
    showSummary(id);
  }
}

function isIdFullArticle (id) {
  console.log(id);
  console.log(id.slice(0,4));
  if ("full" === id.slice(0, 4)) {
    return true;
  } else {
    return false;
  }
}

function getArticleIdFromUrl (location) {
  return location.hash.split("#")[1];
}

function showSummary(id) {
  articles.getSummaryText(id, summary);
}

function showFullArticle(id) {
  articles.getFullArticleText(id);
}
