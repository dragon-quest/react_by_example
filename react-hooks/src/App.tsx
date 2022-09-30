import { useContext, useEffect, useReducer, useRef, useState, useMemo, useCallback } from 'react'
import './App.css'
import CodeInfoContext from './main'
import SomeChild from './SomeChild'
import useLocalStorage from './useLocalStorage'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}

function App() {
  let [count, setCount] = useState(0)
  const codeInfo = useContext(CodeInfoContext)
  const ref = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(reducer, 0)

  const handleClick = () => {
    console.log(count);
    setCount(count + 1)
  }

  const handleRef = () => {
    console.log(ref)
    console.log(ref.current?.offsetHeight)
  }

  // useMemo
  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)

  const square = useMemo(() => {
    let i = 0
    while (i < 2000000000) {
      i++
    }
    return count02 * count02
  }, [count02])

  useEffect(() => {
    console.log("Hello Hooks")
  }, [count])

  // useCallBack 関数のメモ化
  const [counter, setCounter] = useState(0)

  // const showCount = () => {
  //   alert("showCount")
  // }

  const showCount = useCallback(() => {
    alert("showCount")
  }, [counter])

  // CustomHook
  const [age, setAge] = useLocalStorage("age", 20)

  return (
    <div className='App'>
      <h1>UseState, useEffect</h1>
      <button onClick={handleClick}>＋</button>
      <p>{count}</p>

      <hr/>
      <h1>useContext</h1>
      <p>{codeInfo.name}</p>
      <p>{codeInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <div ref={ref}>Ref</div>
      <button onClick={handleRef}>UseRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>＋</button>
      <button onClick={() => dispatch({ type: "decrement" })}>−</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1) }>＋</button>
      <button onClick={() => setCount02(count02 + 2) }>＋</button>

      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount} />

      <hr />
      <h1>CustomHook</h1>
      <p>{age}</p>
      <button onClick={() => setAge(100)}>セット</button>
    </div>
  )
}

export default App
