const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-btn');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

const showLoading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoading = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
const newQuote = () => {
    showLoading();
    // pick random quote from apiQuotes array
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if quote has known author and populate using properties from quote object from Quote API
        !randomQuote.author ? (authorText.innerText = 'Unknown') : (authorText.innerText =  '-' + randomQuote.author);
        // Adjust font size depending on quote length
        randomQuote.text.length > 120 ? (quoteText.classList.add('long-quote')) : (quoteText.classList.remove('long-quote'));
        // Set Quote and Hide Loading Circle
    quoteText.innerText = randomQuote.text;
    hideLoading();
}

//  Get Quotes from API
async function getQuotes() {
    showLoading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const resp = await fetch(apiUrl);
        apiQuotes = await resp.json();
        newQuote();
    } catch (err) {
        alert('something went wrong', err)
    }
}

// Tweet quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();