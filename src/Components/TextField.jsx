import { useEffect } from 'react';
import wordsGenerator from '../scripts/wordsGenerator';
import './TextField.css'
import PsiText from './UI/PsiText';
import { addClass, removeClass } from '../scripts/classCrud';
import Cursor from './Cursor/Cursor';

const TextField = () => {
    const text = wordsGenerator();


    useEffect(() => {
        const handleKeyPress = (event) => {

            const key = event.key;
            const currentWord = document.querySelector('.word.current');
            const currentLetter = document.querySelector('.letter.current');
            const expected = currentLetter.innerHTML;
            const isLetter = key.length === 1 && key !== ' ';
            const isSpace = key === ' ';
            const isBackspace = key === "Backspace";
            const isFirstLetter = currentLetter === currentWord.firstChild;
            const isFirstestLetter = currentLetter.classList.contains('first');
            const isExtra = document.querySelector(".letter.incorrect.extra");

            // console.log({ key, expected }); //clg



            if (isLetter) {
                if (currentLetter.innerHTML !== " " && currentLetter.nextSibling !== null && currentLetter.classList.contains('extra') === false) {
                    console.log(currentLetter.innerHTML)
                    addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
                    addClass(currentLetter.nextSibling, 'current');
                    removeClass(currentLetter, 'current');

                } else {
                    const incorrectLetter = document.createElement('span');
                    incorrectLetter.innerHTML = key;
                    incorrectLetter.className = 'letter incorrect extra';
                    currentWord.appendChild(incorrectLetter);
                }
            }


            if (isSpace) {
                if (expected !== ' ') {
                    const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
                    lettersToInvalidate.forEach((letter) => {
                        addClass(letter, 'incorrect');
                    })
                }
                removeClass(currentWord, 'current');
                addClass(currentWord.nextSibling, 'current');

                if (currentLetter) {
                    removeClass(currentLetter, 'current');
                }

                addClass(currentWord.nextSibling.firstChild, 'current');

            }

            if (isBackspace) {

                if (isExtra) {

                    currentWord.removeChild(isExtra)

                } else if (currentLetter && isFirstLetter && !isFirstestLetter) {
                    const lastLetterPreviusWord = currentWord.previousSibling.lastChild.previousSibling;
                    removeClass(currentWord, 'current');
                    addClass(currentWord.previousSibling, 'current');
                    removeClass(currentLetter, 'current');
                    addClass(lastLetterPreviusWord, 'current');
                    removeClass(lastLetterPreviusWord, 'incorrect');
                    removeClass(lastLetterPreviusWord, 'correct');

                } else if (currentLetter && !isFirstestLetter) {
                    removeClass(currentLetter, 'current');
                    addClass(currentLetter.previousSibling, 'current');
                    removeClass(currentLetter.previousSibling, 'incorrect');
                    removeClass(currentLetter.previousSibling, 'correct')
                }

            }


            // move words
            if (currentWord.getBoundingClientRect().top > 250) {
                const words = document.querySelector('.psi-text');
                const margin = parseInt(words.style.marginTop || '0px');
                words.style.marginTop = (margin - 36) + 'px';
            }


            // move cursor
            // TODO: fix cursor extra position
            const nextLetter = document.querySelector('.letter.current');
            const nextWord = document.querySelector('.word.current');
            const cursor = document.querySelector('.cursor');
            const colorCursor = nextLetter.previousSibling ? nextLetter.previousSibling.classList.contains('correct') ? 'rgb(52, 250, 52)' : 'red' : 'white';

            if (nextLetter && nextLetter.getBoundingClientRect().top !== 0) {
                cursor.style.top = nextLetter.getBoundingClientRect().top + 7 + 'px';
                cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
            } else {
                cursor.style.top = nextWord.getBoundingClientRect().top + 7 + 'px';
                cursor.style.left = nextWord.getBoundingClientRect().right - 5 + 'px';

            }
            cursor.style.backgroundColor = colorCursor
            cursor.style.boxShadow = '0 0 10px ' + colorCursor

        };




        addClass(document.querySelector('.letter'), 'current');
        addClass(document.querySelector('.letter'), 'first')
        addClass(document.querySelector('.word'), 'current');

        document.addEventListener('keydown', handleKeyPress);


        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    return (
        <div className='container-field' >
            <Cursor />
            <PsiText>
                {text.map((word, index) => (
                    <div className='word' key={index} dangerouslySetInnerHTML={{ __html: word }}>
                    </div>
                ))}
            </PsiText>

        </div>
    );
}

export default TextField;