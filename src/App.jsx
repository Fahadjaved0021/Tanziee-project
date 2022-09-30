import { useState } from 'react'
import React from 'react'
import './App.css'
import Die from './Component/Die'
import {nanoid} from 'nanoid'

function App() {



  const [dice, setDice] = useState(allNewArray())

  

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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
      die :
      generateNewDie()

    }))

    // setDice(allNewArray())

  }

  return (
    <div className="App">
      <main>
      <h1 className="title">Tanziee</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
      {dieElements}
      </div>

      <button className='roll-dice' onClick={rollDice}>Roll</button>
      
      </main>
      
    </div>
  )
}

export default App
