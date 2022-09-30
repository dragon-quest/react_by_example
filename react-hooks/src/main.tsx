import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const codeInfo = {
  name: "code name",
  age: 20,
}

const CodeInfoContext = createContext(codeInfo)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CodeInfoContext.Provider value={codeInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CodeInfoContext.Provider>
)

export default CodeInfoContext