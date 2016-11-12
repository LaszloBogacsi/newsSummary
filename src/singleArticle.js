function SingleArticle(article) {
  this.article = article;

}

SingleArticle.prototype.getSingleArticleApiUrl = function (article) {
  var apiUrl = this.article.apiUrl;
  return apiUrl;
};

SingleArticle.prototype.getWebTitle = function () {
  webTitle = this.article.webTitle;
  return webTitle;
};

SingleArticle.prototype.getWebUrl = function () {
  webUrl = this.article.webUrl;
  return webUrl;
};

SingleArticle.prototype.getThumbnail = function () {
  thumbnail = this.article.fields.thumbnail;
  return thumbnail;
};

SingleArticle.prototype.getBody = function () {
  body = this.article.fields.body;
  return body;
};

SingleArticle.prototype.getId = function () {
  id = this.article.id;
  return id;
};
