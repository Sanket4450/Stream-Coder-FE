import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TfiAlignLeft, TfiAlignJustify } from 'react-icons/tfi'
import { FaRegEye } from 'react-icons/fa'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { GoTerminal } from 'react-icons/go'
import { Drawer, Menu, MenuItem } from '@mui/material'

// local imports
import { CONSTANTS } from '../../helper/constants'
import './styles/index.scss'
import { TABS } from '../../helper/selection'
import { Tab } from '../../interfaces/common'
import { ModeSwitch } from '../ui/ModeSwitch'
import { useWindowSize } from '../../hooks/useWindowSize'

export default () => {
  const { width } = useWindowSize()

  const [fileDrawerOpen, setFileDrawerOpen] = useState<boolean>(true)
  const [tabAnchorEl, setTabAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTab, setSelectedTab] = useState<null | Tab>(null)

  const isTabMenuOpen = Boolean(tabAnchorEl)

  const openFileDrawer = () => {
    setFileDrawerOpen(true)
  }

  const closeFileDrawer = () => {
    setFileDrawerOpen(false)
  }

  const openTabMenu = (e: any) => {
    setTabAnchorEl(e.currentTarget)
  }

  const closeTabMenu = () => {
    setTabAnchorEl(null)
  }

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab)
    setTabAnchorEl(null)
  }

  return (
    <header>
      <div className="header_left">
        <TfiAlignLeft className="drawer_icon" onClick={openFileDrawer} />
        <Link to="/" className="logo">
          {CONSTANTS.PROJECT_NAME}
        </Link>
      </div>
      <div className="header_right">
        <ModeSwitch />
        <TfiAlignJustify className="menu_icon" onClick={openTabMenu} />
      </div>

      {width <= CONSTANTS.SM && (
        <Drawer
          open={fileDrawerOpen}
          onClose={closeFileDrawer}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'var(--secondary_bg)',
              color: 'var(--dark_text)',
              userSelect: 'none',
            },
          }}
        >
          <h1>hellow </h1>
        </Drawer>
      )}

      {width <= CONSTANTS.XL && (
        <Menu
          id="tab-menu"
          anchorEl={tabAnchorEl}
          open={isTabMenuOpen}
          onClose={closeTabMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'var(--secondary_bg)',
              borderRadius: '10px',
            },
            '& .MuiList-root': {
              padding: 0,
              backgroundColor: 'var(--secondary_bg)',
              color: 'var(--dark_text)',
            },
          }}
        >
          {TABS.map((tab) => (
            <MenuItem
              key={tab.value}
              onClick={() => handleTabClick(tab)}
              selected={selectedTab?.value === tab.value}
              sx={{
                '&:focus': {
                  backgroundColor: 'var(--secondary_bg)',
                },
                '&:active': {
                  backgroundColor: 'var(--secondary_hover_bg)',
                },
                '&:hover': {
                  backgroundColor: 'var(--secondary_hover_bg)',
                },
              }}
            >
              <div className="tab_menu_item">
                {tab.value === CONSTANTS.LIVE_PREVIEW_VALUE ? (
                  <FaRegEye className="tab_menu_icon" />
                ) : tab.value === CONSTANTS.CHAT_VALUE ? (
                  <IoChatboxEllipsesOutline className="tab_menu_icon" />
                ) : tab.value === CONSTANTS.TERMINAL_VALUE ? (
                  <GoTerminal className="tab_menu_icon" />
                ) : null}
                {tab.label}
              </div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </header>
  )
}
