
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

// const response = fetch(proxyUrl+apiUrl,{headers:{'Origin': ''}});
// console.log(response);

var x = new XMLHttpRequest();
x.open('GET',proxyUrl+apiUrl);
// I put "XMLHttpRequest" here, but you can use anything you want.
x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
x.onload = function myquote () {
    resp = JSON.parse(x.response);
    var quoteText = resp.quoteText;    
    var quoteAuthor = resp.quoteAuthor;
    document.querySelector('.Quote.text').innerHTML = quoteText;
    document.querySelector('.author.name').innerHTML = quoteAuthor;
    return {quoteText:quoteText,quoteAuthor:quoteAuthor}
};
x.send();


myval = myquote();

const tweetbtn = document.querySelector('.twitter');

tweetBtn.addEventListener('click', function() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${myval.quoteText}`;
    window.open(tweetUrl);
  });