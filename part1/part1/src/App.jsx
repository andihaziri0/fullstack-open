import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footeri = () => {
  return (
    <p>Ky eshte footeri</p>
  )
}


const App = () => {
  const friends = [
    {name: 'suela', age: 18},
    {name: 'edi', age: 19}
    
  ]

  const friendsNames = [
    'suela', 'edi', 'andi'
  ]

  return (
    <>
      <div>
        <h1>greetings</h1>
        <Hello name="ardian" age="25" />
        <Hello name="suela" age="18" />
        <Hello name="edi" age="19" />
        <Footeri />
        <div>
          {friendsNames}
        </div>
      </div>
    </>
  )
}
export default App
