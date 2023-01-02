
import dron from './../public/dron.png'
import Image from 'next/image'

import quiz from './quizRawData.json'
import React, { useState, useEffect } from 'react';

function Quiz() {

    const [currentQuestionCount, setcurrentQuestionCount] = useState(1)
    const [quizData, setQuizData] = useState(quiz[0]);
    const [counter, setCounter] = useState(5);
    const [answer, setAnswer] = useState([]);
    const [finalAnswer, setFinalAnswer] = useState();

    const timerAndQuestinDisplay = () => {
        return setInterval(() => {
            counter > 0 && setCounter(counter - 1);
            if (counter === 0 && currentQuestionCount < quiz.length) {
                setQuizData(quiz[currentQuestionCount])
                setCounter(5);
                setAnswer([]);
                setcurrentQuestionCount(currentQuestionCount + 1)
            }
        }, 1000);
    }

    const currentQuestinAnswer = (param) => {
        //restrict same element push
        // if(!answer.find(el=>el=== param)){
        setAnswer([...answer, param]);
        // }
    }

    useEffect(() => {
        const timer = timerAndQuestinDisplay();

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className='flex items-center  h-screen p-5  bg-[#FFF]'>
            <div className="p-6">
                <div className='justify-center'>
                    <div className="text-center">
                        <p className='px-8 py-6 text-gray-700 text-4xl border rounded-full round inline-block  bg-[#ff8ea0] border-[#FDD7DF] text-[#FFF] font-bold'>{counter}</p>
                    </div>
                    <div className='flex  justify-center m-10'>
                        <Image className="w-40" src={dron} alt="Dron images"></Image>
                    </div>
                    {
                        <div className=" px-6">
                            <div className="font-bold text-xl mb-2 text-black">{quizData.question}</div>
                            {answer.length > 0 && <div className="">
                                <span className="inline-block border    rounded-full p-2 text-sm font-semibold text-gray-700 mr-2 mb-2">{[...new Set(answer)].join(" ")}</span>
                            </div>}
                            <div className='flex flex-wrap'>
                                {quizData.options.map((ele, i) => {
                                    return (
                                        <div key={i} className='relative border border-grey-500  rounded-[10px] my-3 mr-3 '>
                                            <button onClick={() => currentQuestinAnswer(ele)} className={`${answer.find(el => el === ele) && " font-semibold bg-[#e2def8] text-black rounded-[10px]"} text-sm text-black-300   py-2 px-4`}>
                                                {ele}
                                            </button>
                                            <div className='absolute top-0 right-0 font-semibold'>{answer.length>0?answer.filter(val => val === ele).length !== 0?answer.filter(val => val === ele).length:"":""}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default Quiz;