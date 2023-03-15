const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
var x = new XMLHttpRequest();


function myquote(resp) {
    // const resp = JSON.parse(x.response);
    const quoteText = resp.quoteText;    
    const quoteAuthor = resp.quoteAuthor;
    return {quoteText:quoteText,quoteAuthor:quoteAuthor};
}

function showLoading() {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.appendChild(spinner);
    document.body.appendChild(loading);
  }
  
function hideLoading() {
    const loading = document.querySelector('.loading');
    
    loading.remove();
    
}




function getQuote(){
    quoteBtn.disabled = true;
    // removeQuoteContainer();
    showLoading();

    x.open('GET', proxyUrl+apiUrl);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.onload = function() {
        try{
            const result = myquote(JSON.parse(x.response)); // call myquote() function here
            const quoteText = result.quoteText;
            const quoteAuthor = result.quoteAuthor;
            const QuoteDIV = document.querySelector('.Quote.text');
            document.querySelector('.Quote.text').innerHTML = quoteText;
            document.querySelector('.author.name').innerHTML = quoteAuthor;
            if (quoteText.length > 50){
                // QuoteDIV.add('Quote-text-long');
                QuoteDIV.className+= "Quote-text-long";    
        }


        } catch(error) {

            console.error('An error occurred:', error);
            console.error('Error type:', error.constructor.name);
            document.querySelector('.Quote.text').innerHTML = 'Error (Reloading)';
            quoteBtn.disabled = false;
            hideLoading();
            location.reload();
        }


        quoteBtn.disabled = false;
        hideLoading();


    };

    x.send();

    
}



const tweetBtn = document.querySelector('.twitter');
tweetBtn.addEventListener('click', function() {
    const myval = myquote(JSON.parse(x.response));
    const tweetUrl = `https://twitter.com/intent/tweet?text=${myval.quoteText}`;
    window.open(tweetUrl);
});


const quoteBtn = document.querySelector('.btnNewQuote');
quoteBtn.addEventListener('click', function(){
    getQuote();
});
