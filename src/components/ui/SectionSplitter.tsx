import { FC, useState } from 'react'
import './styles/SectionSplitter.scss'

export const SectionSplitter: FC<{ id?: string; dir?: string; isDragging: boolean }> = ({
  id = 'drag-bar',
  dir,
  isDragging,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={`drag_bar ${dir === 'horizontal' ? 'drag_bar_horizontal' : ''} ${
        isDragging || isFocused ? 'drag_bar_dragging' : ''
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  )
}
