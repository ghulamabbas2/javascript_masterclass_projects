const colors = [
    '#490A3D',
    '#BD1550',
    '#E97F02',
    '#F8CA00',
    '#8A9B0F',
    '#69D2E7',
    '#FA6900',
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#77B1A9',
    '#73A857'
];

const quotes = [
    ["You only live once, but if you do it right, once is enough.", "Mae West"],
    ["I am so clever that sometimes I don't understand a single word of what I am saying.", "Oscar Wilde"],
    ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "Albert Einstein"],
    ["The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.", "Albert Einstein"],
    ["I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best,", "Marilyn Monroe"],
    ["We accept the love we think we deserve.", "Stephen Chbosky, The Perks of Being a Wallflower"],
    ["It is our choices, Harry, that show what we truly are, far more than our abilities.", "J.K. Rowling, Harry Potter and the Chamber of Secrets"],
    ["All men who have turned out worth anything have had the chief hand in their own education.", "Walter Scott"],
    ["Trust yourself. You know more than you think you do.", "Benjamin Spock"],
    ["No one can make you feel inferior without your consent.", "Eleanor Roosevelt, This is My Story"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.", "H. Jackson Brown Jr., P.S. I Love You"]
];

const mainArea = document.querySelector('#quote');

let currentQuote = '';
let currentAuthor = '';
let randomquote = '';
let randomcolor = '';

function getQuote() {
    randomquote = Math.floor(Math.random() * quotes.length);  //6
    randomColor = Math.floor(Math.random() * colors.length);

    currentQuote = quotes[randomquote][0];
    currentAuthor = quotes[randomquote][1];

    const markup = `<blockquote id="quote_text" class="text-left">${currentQuote}</blockquote>
                    <p id="author">― ${currentAuthor}</p>`;

    mainArea.innerHTML = markup;

    document.body.style.background = colors[randomColor];
    document.querySelector('h1').style.color = colors[randomColor];
    document.querySelector('#quote_btn').style.background = colors[randomColor];
    document.querySelector('#quote_text').style.borderLeft = `10px solid ${colors[randomColor]}`;


}

const quotesButton = document.querySelector('#quote_btn');
quotesButton.addEventListener('click', getQuote);
getQuote();