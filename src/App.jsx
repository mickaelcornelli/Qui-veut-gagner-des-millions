import "./App.css";
import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { AiFillPhone } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import fiftyFifty from "./sounds/joker50-50.mp3";
import publicHelp from "./sounds/jokerpublic.mp3";
import callHelp from "./sounds/jokercall.mp3";
import endOfTheGame from "./sounds/endgame.mp3";
import million from "./sounds/millionMusic.mp3";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0 €");
  const [publicJokerUsed, setPublicJokerUsed] = useState(false)
  const [publicVoteResult, setPublicVoteResult] = useState('')
  const [callJokerUsed, setCallJokerUsed] = useState(false)
  const [fiftyJokerUsed, setFiftyJokerUsed] = useState(false)
  const [endGame] = useSound(endOfTheGame,{volume: 0.05})
  const [fiftyJoker] = useSound(fiftyFifty,{volume: 0.4})
  const [publicJoker] = useSound(publicHelp,{volume: 0.05})
  const [callJoker] = useSound(callHelp,{volume: 0.05})
  const [questionMillion] = useSound(million,{volume: 0.05})
  const [answers, setAnswers] = useState('');

  useEffect(()=>{
    if(timeOut){
      document.querySelector(".jokerList").style.display="none"
      endGame()
    }
    if(callJokerUsed){
      setCallJokerUsed(false)
    }
  })
  useEffect(() => {
    if(questionNumber!==1){
      document.querySelectorAll(".answer").forEach(element => {
        element.style.display = "block"
      })
    }
    if(questionNumber>9){
      setTimeout(() =>{
        questionMillion()
      }, 4000)      
    }
    if(questionNumber>12){
      setTimeOut(true)
    }
  }, [questionNumber]);

  const restart = () => {
    window.location.reload()
  };

  const getRandomInteger = (max,min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const onClickJoker = (e) => {
    e.preventDefault()
    
    if(e.target.title ==='50:50'){
      fiftyJoker()
      let indexChoiceOne 
      let indexChoiceTwo
      let choiceOne
      let choiceTwo
      
      for (let index = 0; index < data[questionNumber-1].answers.length; index++) {
        if(data[questionNumber-1].answers[index].correct === true){
          indexChoiceOne = index 
          choiceOne = data[questionNumber-1].answers[index].text
        }
      }
      do {
        indexChoiceTwo = getRandomInteger(-1,4)
        choiceTwo = data[questionNumber-1].answers[indexChoiceTwo].text
      } while(indexChoiceTwo === indexChoiceOne)
            
      document.querySelectorAll(".answer").forEach(element => {
        if(element.textContent!==choiceOne && element.textContent!==choiceTwo){
          element.style.display = "none"
        }
      })
      e.currentTarget.style.display="none" 
      setFiftyJokerUsed(true)
    }

    if(e.target.title ==='call'){
      setCallJokerUsed(true)
      callJoker()
      e.currentTarget.style.display="none" 
    }

    if(e.target.title ==='public'){
      publicJoker()
      if(fiftyJokerUsed){
        let answerArray = []
        document.querySelectorAll(".answer").forEach(element => {
          if(element.style.display !== 'none')
          {
            answerArray.push(element.innerHTML)
            setAnswers(answerArray)
          }
          
        })
        const voteResult = {
          a: 0,
          b: 0
        }
        for (let index = 0; index < 100; index++) {
          let random = getRandomInteger(-1,2)
          if(random === 0){
            voteResult.a += 1
          } 
          if(random === 1){
            voteResult.b += 1
          } 
        }
        setPublicJokerUsed(true)
        setTimeout(() =>{
          setPublicVoteResult(voteResult)
        }, 10700)
        setTimeout(() =>{
          setPublicJokerUsed(false)
        }, 20000)
        e.currentTarget.style.display="none"  
      }
      else{
        const voteResult = {
          a:0,
          b:0,
          c:0,
          d:0,
        }
        for (let index = 0; index < 100; index++) {
          let random = getRandomInteger(-1,4)
          if(random === 0){
            voteResult.a += 1
          } 
          if(random === 1){
            voteResult.b += 1
          } 
          if(random === 2){
            voteResult.c += 1
          } 
          if(random === 3){
            voteResult.d += 1
          } 
        }
        setPublicJokerUsed(true)
        setTimeout(() =>{
          setPublicVoteResult(voteResult)
        }, 10700)
        setTimeout(() =>{
          setPublicJokerUsed(false)
        }, 20000)
        e.currentTarget.style.display="none" 
      }
     
    }
    
  }

  const data = [
    {
      id: 1,
      question: "De quelle couleur est le cheval blanc d'henry IV?",
      answers: [
        {
          text: "A - Blanc",
          correct: true,
        },
        {
          text: "B - Gris",
          correct: false,
        },
        {
          text: "C - Noir",
          correct: false,
        },
        {
          text: "D - Marron",
          correct: false,
        },
      ],
    },
     {
      id: 2,
      question: "Quelle partie de l'oeuf est utilisé pour faire une mayonnaise ?",
      answers: [
        {
          text: "A - Le blanc",
          correct: false,
        },
        {
          text: "B - Le jaune",
          correct: true,
        },
        {
          text: "C - La coquille",
          correct: false,
        },
        {
          text: "D - Les membranes",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "L'un des plus grand chef d'oeuvre de littérature de la grèce antique est ?",
      answers: [
        {
          text: "A - L'odyssée (Homere)",
          correct: true,
        },
        {
          text: "B - L'expédition (Bart)",
          correct: false,
        },
        {
          text: "C - La thalassothérapie (Marge)",
          correct: false,
        },
        {
          text: "D - Le road-Trip (Moe)",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: "Quelle unité utilise t-on pour mesure la tension électrique?",
      answers: [
        {
          text: "A - Hertz",
          correct: false,
        },
        {
          text: "B - Volt",
          correct: true,
        },
        {
          text: "C - Watt",
          correct: false,
        },
        {
          text: "D - Décibel",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "Lequel de ces quatre mots est bien orthographiés ?",
      answers: [
        {
          text: "A - Anticonstitutionellement",
          correct: false,
        },
        {
          text: "B - Anticonstitutionnelement",
          correct: false,
        },
        {
          text: "C - Anticonstitutionelement",
          correct: false,
        },
        {
          text: "D - Anticonstitutionnellement",
          correct: true,
        },
      ],
    },
    {
      id: 6,
      question: "Quel pays ne faisait pas partie des demi finaliste de la coupe du monde 2018 de football?",
      answers: [
        {
          text: "A - La france",
          correct: false,
        },
        {
          text: "B - L'allemagne",
          correct: true,
        },
        {
          text: "C - La croatie",
          correct: false,
        },
        {
          text: "D - La belgique",
          correct: false,
        },
      ],
    },
    {
      id: 7,
      question: "Quel film détient le plus gros succès mondial au box office?",
      answers: [
        {
          text: "A - Avatar",
          correct: true,
        },
        {
          text: "B - Avengers",
          correct: false,
        },
        {
          text: "C - Titanic",
          correct: false,
        },
        {
          text: "D - Star Wars",
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: "A quelle famille la méduse appartient-elle ?",
      answers: [
        {
          text: "A - Poisson",
          correct: false,
        },
        {
          text: "B - Crustacés",
          correct: false,
        },
        {
          text: "C - Cnidaires",
          correct: true,
        },
        {
          text: "D - Mammifères",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "Quel est le nom du dieu grec équivalent à Jupiter chez les dieux romains",
      answers: [
        {
          text: "A - Junon",
          correct: false,
        },
        {
          text: "B - Apollon",
          correct: false,
        },
        {
          text: "C - Dionysos",
          correct: false,
        },
        {
          text: "D - Zeus",
          correct: true,
        },
      ],
    },
    {
      id: 10,
      question: "Dans quelle boisson trouve t-on de la quinine?",
      answers: [
        {
          text: "A - Thé",
          correct: false,
        },
        {
          text: "B - Café",
          correct: false,
        },
        {
          text: "C - Tonic",
          correct: true,
        },
        {
          text: "D - Cola",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "Combien d'oscars a obtenu le seigneur des anneaux le retour du roi?",
      answers: [
        {
          text: "A - 5",
          correct: false,
        },
        {
          text: "B - 7",
          correct: false,
        },
        {
          text: "C - 9",
          correct: false,
        },
        {
          text: "D - 11",
          correct: true,
        },
      ],
    },
    {
      id: 12,
      question: "Lequel de ces présidents a fait une apparition dans la série TV Laugh-in ?",
      answers: [
        {
          text: "A - Richard Nixon",
          correct: true,
        },
        {
          text: "B - Gerard Ford",
          correct: false,
        },
        {
          text: "C - Jimmy Carter",
          correct: false,
        },
        {
          text: "D - Lyndon Johnson",
          correct: false,
        },
      ],
    },  
    {
      id: 13,
      question: "",
      answers: [
        {
          text: "",
          correct: false,
        },
        {
          text: "",
          correct: false,
        },
        {
          text: "",
          correct: false,
        },
        {
          text: "",
          correct: false,
        },
      ],
    }, 
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "500 €" },
        { id: 2, amount: "1 000 €" },
        { id: 3, amount: "2 000 €" },
        { id: 4, amount: "4 000 €" },
        { id: 5, amount: "8 000 €" },
        { id: 6, amount: "12 000 €" },
        { id: 7, amount: "24 000 €" },
        { id: 8, amount: "48 000 €" },
        { id: 9, amount: "72 000 €" },
        { id: 10, amount: "150 000 €" },
        { id: 11, amount: "300 000 €" },
        { id: 12, amount: "1 000 000 €" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">

            {timeOut ? (
              <div className="result">
                <h1 className="endText">Bravo <span className="userWinner">{username}</span> ! Vous avez gagné: {earned}</h1>
                <button className="restart" onClick={restart}>Relancer une partie</button>
              </div>
             
            ) : (
              <>
                <div className="top">
                {publicJokerUsed && (
                  <div>
                  {fiftyJokerUsed ? 
                  <div className="publicGraph">
                    <div className="votes">
                      <p>{answers[0]}</p>
                      <p className="voteResult">{publicVoteResult.a}%</p>
                    </div>
                    <div className="votes">
                      <p>{answers[1]}</p>
                      <p className="voteResult">{publicVoteResult.b}%</p>
                    </div>
                  </div>
                  :
                  <div className="publicGraph">
                    <div className="vote">
                      <p>Réponse A</p>
                      <p className="voteResult">{publicVoteResult.a}%</p>
                    </div>
                    <div className="vote">
                      <p>Réponse B</p>
                      <p className="voteResult">{publicVoteResult.b}%</p>
                    </div>
                    <div className="vote">
                      <p>Réponse C</p>
                      <p className="voteResult">{publicVoteResult.c}%</p>
                    </div>
                    <div className="vote">
                      <p>Réponse D</p>
                      <p className="voteResult">{publicVoteResult.d}%</p>
                    </div>
                  </div>
                  }
                    
                  </div>
                )}
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                      joker={callJokerUsed}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="pyramid">
            <div className="jokerList">
                <button className="joker" onClick={onClickJoker} title="50:50">50:50</button>
                <button className="joker" onClick={onClickJoker} title="call"><AiFillPhone/></button>
                <button className="joker" onClick={onClickJoker} title="public"><MdGroups/></button>
            </div>
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                
                <li key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
