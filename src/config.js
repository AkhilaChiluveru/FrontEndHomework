import jokeicon from "./Logos/joke-icon.jpeg";
import dictionaryicon from "./Logos/dictionary-icon.png";
import newsicon from "./Logos/news-icon.png";
import gifsicon from "./Logos/GIfs-icon.gif";
import musicicon from "./Logos/music-icon.png";
import quoteicon from "./Logos/quote-icon.jpeg";
import adviceicon from "./Logos/advice-icon.png";
import eventsicon from "./Logos/events-icon.png";

export const eventsConfig = [
  {
    name: "Jokes",
    iconUrl: jokeicon,
    apiUrl: "https://geek-jokes.sameerkumar.website/api?format=json",
  },
  {
    name: "Advice",
    iconUrl: adviceicon,
    apiUrl: "https://api.adviceslip.com/advice",
  },
  {
    name: "Dictionary",
    iconUrl: dictionaryicon,
    apiUrl: "https://random-words-api.vercel.app/word",
  },
  {
    name: "Quotes",
    iconUrl: quoteicon,
    apiUrl: "https://programming-quotes-api.herokuapp.com/Quotes",
  },
];
