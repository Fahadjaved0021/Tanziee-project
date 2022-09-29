import { useState } from 'react'
import React from 'react'
import './App.css'
import Die from './Component/Die'
import {nanoid} from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewArray())

  const dieElements = dice.map(die => <Die value={die.value} />) 

  function allNewArray () {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push({
          
        value: Math.ceil(Math.random()* 6), 
        isHeld:false,
        id: nanoid()
      
      })
      }
      return newDice
  }


  function rollDice () {
    setDice(allNewArray)

  }

  console.log(allNewArray())

  return (
    <div className="App">
      <main>
        <div className='dice-container'>
      {dieElements}
      </div>

      <button className='roll-dice' onClick={rollDice}>Roll</button>
      
      </main>
      
    </div>
  )
}

export default App
