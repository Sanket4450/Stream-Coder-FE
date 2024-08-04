import { FC } from 'react'
import './styles/Tabs.scss'
import { TABS } from '../../helper/selection'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setTab } from '../../store/slices/tab'
import { Tab } from '../../interfaces/common'

export const Tabs: FC = () => {
  const activeTab = useAppSelector((state) => state.tab.value)

  const dispatch = useAppDispatch()

  const handleTabChange = (tab: Tab) => {
    dispatch(setTab(tab.value))
  }

  return (
    <section className="tabs_section">
      <div className="tabs_navbar">
        {TABS.map((tab) => (
          <span
            className={`tab ${activeTab === tab.value ? 'active_tab' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.label}
          </span>
        ))}
      </div>
    </section>
  )
}
