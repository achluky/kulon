window.MonacoEnvironment = { baseUrl: '/monaco-editor-external' };
import React from 'react'
import MonacoEditor from 'react-monaco-editor'
import '../node_modules/@timkendrick/monaco-editor/dist/external/monaco.css'

export default (props) => (
  <MonacoEditor
    width={500}
    height={200}
    language="javascript"
    theme="vs-dark"
    value=""
    options={{selectOnLineNumbers: true}}
    onChange={() => null}
    editorDidMount={() => null}
    {...props}
  />
)