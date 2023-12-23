'use client'

import Editor from '@monaco-editor/react';
import React, { useState, useRef } from 'react';
import { usePython } from 'react-py'
import './CodeEditor.css';

const files = {
    "script.py": {
      name: "script.py",
      language: "python",
      value: "print(3+5)"
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<div> </div>"
    }
}

export default function CodeEditor() {
    const [fileName, setFileName] = useState("script.py"); // change to "index.html"
    const editorRef = useRef(null);
    const file = files[fileName];
    const [input, setInput] = useState('');
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
      }

    return (
        <>
            {isLoading ? <p>Loading...</p> : <p>Ready!</p>}

            <input
                type="submit"
                value={!isRunning ? 'Run' : 'Running...'}
                disabled={isLoading || isRunning}
                onClick={(e) => {
                e.preventDefault()
                runPython(input)
                }}
            />
            <Editor
                height="60vh"
                width="100%"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onChange={() => setInput(editorRef.current.getValue())}
            />

            <div className='CodeEditor-text-areas-container'>
                <textarea
                    value={stdout}
                    className='CodeEditor-text-area'
                    readOnly={true}
                />
                <textarea
                    value={stderr}
                    className='CodeEditor-text-area'
                    readOnly={true}
                />
            </div>
        </>

    )
}