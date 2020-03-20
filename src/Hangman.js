import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
        nWrong: 0, 
        guessed: new Set(),
        answer: randomWord(),
        hasWon:false
      };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    let updatedguessed=this.state.guessed.add(ltr);
    let ifwon=false;
    for (let index = 0; index < this.state.answer.length; index++) {
      const element = this.state.answer[index];
      if(this.state.guessed.has(element))
        ifwon=true;
      else {
        ifwon=false;
        break;
    }}
    this.setState(st => ({
      guessed: updatedguessed,
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      hasWon:ifwon
    }));
  }
  handleRestart=()=>{
    this.setState({
      nWrong: 0, 
        guessed: new Set(),
        answer: randomWord(),
        hasWon:false
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong + "/"+ this.props.maxWrong +" Choices Remaining"} />
        {
          this.state.nWrong<this.props.maxWrong ? 
          this.state.hasWon ?
          <div>
            <h2>Number of wrong geusses:{this.state.nWrong}</h2>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            <h4>You Won</h4>
          </div>
          :
          <div>
          <h2>Number of wrong geusses:{this.state.nWrong}</h2>
          <p className='Hangman-word'>{this.guessedWord()}</p>
          <p className='Hangman-btns'>{this.generateButtons()}</p>
          </div>
          :
          <div>
          <h2>You Lose</h2>
          <h2>The correct Answer was {this.state.answer}</h2>
          </div>
        }
        <button onClick={this.handleRestart} id="reset">Restart</button>

      </div>
    );
  }
}

export default Hangman;
