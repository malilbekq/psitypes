import { COMMON_WORDS } from "./constants";
import { randomIntFromRange } from "./randomIntFromRange";


function formatWord(word) {
    return `<span class="letter">${word.split('').join(`</span><span class="letter">`)}</span>`;
 }

export default function wordsGenerator() {
    const EnglishWordList = [];
    for (let i = 0; i < 200; i++) {
        const rand = randomIntFromRange(0, 550);
        let wordCandidate = COMMON_WORDS[rand].val;
        wordCandidate = formatWord(wordCandidate) + '<span class="letter" hidden > </span>';
        // console.log(wordCandidate);
        EnglishWordList.push(wordCandidate);
    }
    
    return EnglishWordList;
}