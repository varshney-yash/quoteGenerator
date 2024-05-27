// Fetching quotes from API

const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const nextQuoteBtn=document.getElementById('next-quote');

let quotes=[];

function nextQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    let author = quote.author || 'Anonymous';
    author = author.replace(/, type\.fit$/, '');
    authorText.textContent = author;
    quoteText.textContent = quote.text;
   
    if (quote.text.length > 100) {
        quoteText.classList.add('long-text');
    } else {
        quoteText.classList.remove('long-text');
    }
}

async function getQuotes(){
    const url='https://type.fit/api/quotes';
    try{
        const resp= await fetch(url);
        quotes= await resp.json();
        nextQuote();
    } catch(error){
        quotes=localQuotes;
        nextQuote();
        alert('Displaying local quotes only');
    }
}

//tweeting
function tweetQuote(){
    const tURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tURL,'_blank');
}

//event listeners
nextQuoteBtn.addEventListener('click',nextQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuotes();
