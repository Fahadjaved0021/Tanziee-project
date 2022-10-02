import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Die from './Component/Die'
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(allNewArray())

  const [tenzies, setTenzies] = useState(false)
    
  useEffect(() => {
      console.log("Dice state changed")

    const allHeld = dice.every(die => die.isHeld )
    const firstValue = dice[0].value
    const allSameValue = dice.every(die=>die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won")

    }

  }, [dice])
  

  function allNewArray () {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function generateNewDie () {

    return {
          
      value: Math.ceil(Math.random()* 6), 
      isHeld:false,
      id: nanoid()
    
    }

  }

  function holdDice(id) {

    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
    console.log(id)
  }

  const dieElements = dice.map(die => <Die key= {die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />) 

  function rollDice () {
    if (!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die :
        generateNewDie()
  
      }))
    }else {
      setTenzies(false)
      setDice(allNewArray())
    }
    

    // setDice(allNewArray())

  }

  return (
    <div className="App">

      <main>
        {tenzies && <Confetti />}
      <h1 className="title">Tanziee</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
      {dieElements}
      </div>

      <button 
      className='roll-dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      
      </main>
      
    </div>
  )
}

export default App
