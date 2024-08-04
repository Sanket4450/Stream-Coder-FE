import { FC, useLayoutEffect, useState } from 'react'
import Editor, { loader } from '@monaco-editor/react'
import { FaPlay } from 'react-icons/fa'

// local imports
import './styles/TextEditor.scss'
import { useAppSelector } from '../../hooks/redux'
import { CONSTANTS } from '../../helper/constants'
import { useWindowSize } from '../../hooks/useWindowSize'

export const TextEditor: FC = () => {
  const theme = useAppSelector((state) => state.theme.value)
  const [editorWidth, setEditorWidth] = useState('calc(100% - 30px)')

  const { width } = useWindowSize()

  loader.init().then((monaco) => {
    monaco.editor.defineTheme(CONSTANTS.EDITOR_THEME, {
      base: 'vs-dark',
      inherit: true,
      rules:
        theme === CONSTANTS.DARK
          ? [
              { token: '', foreground: 'd4d4d4', background: CONSTANTS.DARK_EDITOR_COLOR },
              { token: 'comment', foreground: '6a9955' },
              { token: 'string', foreground: 'ce9178' },
              { token: 'keyword', foreground: '569cd6' },
              { token: 'number', foreground: 'b5cea8' },
              { token: 'regexp', foreground: 'd16969' },
              { token: 'operator', foreground: 'd4d4d4' },
              { token: 'delimiter', foreground: 'd4d4d4' },
              { token: 'namespace', foreground: '4ec9b0' },
              { token: 'type', foreground: '4ec9b0' },
              { token: 'class', foreground: '4ec9b0' },
              { token: 'interface', foreground: '4ec9b0' },
              { token: 'enum', foreground: '4ec9b0' },
              { token: 'function', foreground: 'dcdcaa' },
              { token: 'variable', foreground: '9cdcfe' },
              { token: 'parameter', foreground: '9cdcfe' },
              { token: 'property', foreground: '9cdcfe' },
              { token: 'label', foreground: 'd4d4d4' },
            ]
          : [
              { token: '', foreground: '000000', background: CONSTANTS.LIGHT_EDITOR_COLOR },
              { token: 'comment', foreground: '008000' },
              { token: 'string', foreground: 'a31515' },
              { token: 'keyword', foreground: '0000ff' },
              { token: 'number', foreground: '098658' },
              { token: 'regexp', foreground: '811f3f' },
              { token: 'operator', foreground: '000000' },
              { token: 'delimiter', foreground: '000000' },
              { token: 'namespace', foreground: '267f99' },
              { token: 'type', foreground: '267f99' },
              { token: 'class', foreground: '267f99' },
              { token: 'interface', foreground: '267f99' },
              { token: 'enum', foreground: '267f99' },
              { token: 'function', foreground: '795e26' },
              { token: 'variable', foreground: '001080' },
              { token: 'parameter', foreground: '001080' },
              { token: 'property', foreground: '001080' },
              { token: 'label', foreground: '000000' },
            ],
      colors:
        theme === CONSTANTS.DARK
          ? {
              'editor.background': CONSTANTS.DARK_EDITOR_COLOR,
              'editor.selectionBackground': '#264f78',
              'editor.lineHighlightBackground': '#2d2d2d',
              'editorCursor.foreground': '#aeafad',
              'editorWhitespace.foreground': '#e3e4e229',
              'editorIndentGuide.background': '#404040',
              'editorLineNumber.foreground': '#858585',
              'editorSuggestWidget.background': '#252526',
              'editorSuggestWidget.border': '#454545',
              'editorSuggestWidget.foreground': '#d4d4d4',
              'editorSuggestWidget.highlightForeground': '#0097fb',
              'editorSuggestWidget.selectedBackground': '#062f4a',
            }
          : {
              'editor.background': CONSTANTS.LIGHT_EDITOR_COLOR,
              'editor.selectionBackground': '#add6ff',
              'editor.lineHighlightBackground': '#f3f3f3',
              'editorCursor.foreground': '#000000',
              'editorWhitespace.foreground': '#b3b3b3',
              'editorIndentGuide.background': '#d3d3d3',
              'editorLineNumber.foreground': '#2b91af',
            },
    })
  })

  useLayoutEffect(() => {
    if (width > CONSTANTS.XL) {
      setEditorWidth('calc(100% - 40px)')
    } else {
      setEditorWidth('99.9%')
    }
  }, [width])

  function handleEditorChange(value: any) {
    console.log('here is the current model value:', value)
  }

  return (
    <section className="editor_section">
      {/* <div className="tabs_navbar">
        {TABS.map((tab) => (
          <span
            className={`tab ${activeTab === tab.value ? 'active_tab' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.label}
          </span>
        ))}
      </div> */}
      <Editor
        height="100%"
        width={editorWidth}
        language="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
        theme={CONSTANTS.EDITOR_THEME}
        options={{
          fontSize: 16,
          lineHeight: 1.5,
          minimap: {
            enabled: false,
          },
        }}
      />
      <div className="editor_sidebar">
        <FaPlay className="run_code_btn" />
      </div>
    </section>
  )
}
