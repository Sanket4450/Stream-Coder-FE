import { memo, useEffect } from 'react'
import { createTheme } from '@mui/material/styles'
import { toggleTheme } from '../../store/slices/theme'
import { MaterialUISwitch } from './MaterialUISwitch'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getItem, setItem } from '../../utils'
import { CONSTANTS } from '../../helper/constants'
import { PaletteMode } from '@mui/material'

export const ModeSwitch = memo(() => {
  const theme = useAppSelector((state) => state.theme.value)

  const dispatch = useAppDispatch()

  const currentTheme = createTheme({
    palette: { mode: theme as PaletteMode },
  })

  useEffect(() => {
    document.documentElement.setAttribute(CONSTANTS.THEME, theme)
  }, [theme])

  useEffect(() => {
    const theme = getItem(CONSTANTS.THEME) || CONSTANTS.DARK
    dispatch(toggleTheme(theme))
  }, [])

  const toggleDarkMode = () => {
    const newTheme = theme === CONSTANTS.DARK ? CONSTANTS.LIGHT : CONSTANTS.DARK
    setItem(CONSTANTS.THEME, newTheme)
    dispatch(toggleTheme(newTheme))
  }

  return (
    <MaterialUISwitch
      id="theme-switch"
      theme={currentTheme}
      checked={theme === CONSTANTS.DARK}
      onChange={toggleDarkMode}
    />
  )
})
