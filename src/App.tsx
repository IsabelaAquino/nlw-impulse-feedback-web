import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Widget } from './components/Widget';

interface ButtonProps {
  text?: string;
}

const Button = (props: ButtonProps) => {
  return <button className='button'> {props.text ?? 'Default'} </button>
}

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Widget />
      {/* <div className='flex gap-2'>
        <Button text="Enviar" />
        <Button text="Ok" />
        <Button />
      </div> */}
    </>
  )
}
