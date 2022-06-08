// Fetching quotes from API

const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const nextQuoteBtn=document.getElementById('next-quote');

let quotes=[];

function nextQuote(){
    const quote=quotes[Math.floor(Math.random() *  quotes.length)];
    if(!quote.author){
        authorText.textContent='Anonymous';
    }
    else{
        authorText.textContent=quote.author;
    }
    quoteText.textContent=quote.text;
   
    if(quote.text>100){
        quoteText.classList.add('long-text');
    } else{
        quoteText.classList.remove('long-text')
    }
    quoteText.textContent=quote.text;
}

async function getQuotes(){
    const url='https://type.fit/api/quotes';
    try{
        const resp= await fetch(url);
        quotes= await Response.json();
        nextQuote();
        //console.log(quotes);
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