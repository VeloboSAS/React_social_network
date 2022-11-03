import React, {useState} from 'react';
import s from './Quiz.module.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className={s.result}>
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt=""/>
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href="/quiz">
      <button>Попробовать снова</button>
      </a>

    </div>
  );
}

function Game({step, question, onClickVariants}) {

  const percentage = Math.round(step/questions.length*100);
  console.log(percentage)


  return (
    <>
      <div className={s.progress}>
        <div style={{ width: `${percentage}%` }} className={s.progress__inner}></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => 
        <li onClick={() => onClickVariants(index)} key={text}>{text}</li>)}
      </ul>
    </>
  );
}

function App() {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0)

    const question = questions[step];

    const onClickVariants = (index) => {
        console.log(step, index);
        setStep(step + 1);

        if (index === question.correct) {
            setCorrect(correct +1)
        }
    }

  return (
    <div className={s.App}>
        {
            step !== questions.length ? (<Game step={step} question={question} onClickVariants={onClickVariants}/>) :
            (<Result correct={correct}/>)
        }
{/* 
      <Result /> */}
    </div>
  );
}

export default App;