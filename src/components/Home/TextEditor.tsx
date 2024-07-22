import { Editor } from '@monaco-editor/react'

// local imports
import './styles/TextEditor.scss'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { CONSTANTS } from '../../helper/constants'

export const TextEditor: FC = () => {
  const theme = useAppSelector((state) => state.theme.value)

  function handleEditorChange(value: any) {
    console.log('here is the current model value:', value)
  }

  return (
    <section className="editor_section">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={{
          fontSize: 16,
          lineHeight: 1.5,
          selectOnLineNumbers: true,
          theme: theme === CONSTANTS.DARK ? 'vs-dark' : 'vs-light',
        }}
      />
    </section>
  )
}
