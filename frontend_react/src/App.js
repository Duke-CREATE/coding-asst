'use client'
import './App.css';
import { PythonProvider } from 'react-py'

import CodeEditor from './components/CodeEditor';

function App() {
  return (

    <PythonProvider>
      <main>
        <CodeEditor />
      </main>
    </PythonProvider>
  )
}

export default App;