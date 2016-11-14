function Articles (){
  this.items = [];
  this.articles = [];
}

Articles.prototype.apiHandler = function (apiUrl, webUrl, id) {
this.getDataFromAPI(apiUrl, this._returnResult, this.pushToItemsArray);

};

Articles.prototype.aylienApiHandler = function (webUrl, id) {
this.getSummaryFromApi(webUrl, id, this);
};

Articles.prototype.getDataFromAPI = function (apiUrl, _resultHandler, responseHandler) {
  var httpRequest = new XMLHttpRequest();
  var _returnResult = _resultHandler;
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      _returnResult(httpRequest, responseHandler);
    } else {
      return httpRequest.readyState;
    }
  };
  httpRequest.open('GET', 'https://content.guardianapis.com/search?show-fields=thumbnail,body&api-key=f81f1495-6eed-4a8f-bb2c-19e085e510f2', true);
  httpRequest.send(null);
};


Articles.prototype._returnResult = function (httpRequest, responseHandler) {
  var pushToItemsArray = responseHandler;
  if (httpRequest.status === 200) {
    var response = httpRequest.responseText;
    pushToItemsArray(response);

  } else {
    return httpRequest.status;
  }
};

Articles.prototype.pushToItemsArray = function (response) {
  var headers = JSON.parse(response);
  this.items.push(headers); //fix the scope of this.
  this.createSingleArticle();
};

Articles.prototype.createSingleArticle = function () {
  var _this = this;
  this.items.forEach(function(item){
    results = item.response.results;
    results.forEach(function(result){
      var article = result;
      var singleArticle = new SingleArticle(article);
       _this.addArticleToArticles(singleArticle);
    });
  });
  addHeadlinesToList(this.articles);
};

Articles.prototype.addArticleToArticles = function (singleArticle) {
  this.articles.push(singleArticle);
};

Articles.prototype.getSummaryText = function (id, summary) {
  var _this = this;
  this.articles.forEach(function(singleArticle){
    var articleId = singleArticle.getId();
    var webUrl = singleArticle.getWebUrl();
    if (id === articleId) {
      _this.getSummaryFromApi(webUrl, id); //add fake if needed;
    }
  });
};

Articles.prototype.fakeGetSummaryFromApi = function (webUrl, id) {
  sumSentences = ["sentence1", "sentence2", "sentence3", "sentence4", "sentence5"];
  summary(sumSentences, id);
};

Articles.prototype.getSummaryFromApi = function (webUrl, id) {
  var httpRequest = new XMLHttpRequest();
  var _this = this;
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      _this._returnResultFromAylien(httpRequest, id);
    } else {
      return httpRequest.readyState;
    }
  };
  httpRequest.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + webUrl);
  httpRequest.send(null);
};

Articles.prototype._returnResultFromAylien = function (httpRequest, id) {
  if (httpRequest.status === 200) {
    var response = httpRequest.responseText;
    var sumSentences = JSON.parse(response).sentences;
    summary(sumSentences, id);
  } else {
    return httpRequest.status;
  }
};


Articles.prototype.getFullArticleText = function (id) {
  var _this = this;
  this.articles.forEach(function(singleArticle){
    var articleId = singleArticle.getId();
    if (id === articleId) {
      showFull(singleArticle.getBody());
    }
  });
};

// Delete later
var articles = new Articles();
articles.apiHandler();

//
