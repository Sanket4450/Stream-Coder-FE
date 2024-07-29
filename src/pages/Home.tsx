import { useResizable } from 'react-resizable-layout'
import { FileManager } from '../components/Home/FileManager'
import { TextEditor } from '../components/Home/TextEditor'
import { Tabs } from '../components/Home/Tabs'
import './Home.scss'
import { SectionSplitter } from '../components/ui/SectionSplitter'
import { CONSTANTS } from '../helper/constants'
import { useWindowSize } from '../hooks/useWindowSize'

export default () => {
  const { width } = useWindowSize()

  const {
    isDragging: isFileSectionDragging,
    position: fileSectionW,
    splitterProps: fileSectionDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: CONSTANTS.FILE_SECTION_INITIAL_WIDTH,
    min: CONSTANTS.FILE_SECTION_MINIMUM_WIDTH,
    max: CONSTANTS.FILE_SECTION_MAXIMUM_WIDTH,
  })

  const {
    isDragging: isTabsSectionDragging,
    position: tabsSectionW,
    splitterProps: tabsSectionDragBarProps,
  } = useResizable({
    axis: 'x',
    initial: CONSTANTS.TABS_SECTION_INITIAL_WIDTH,
    min: CONSTANTS.TABS_SECTION_MINIMUM_WIDTH,
    max: CONSTANTS.TABS_SECTION_MAXIMUM_WIDTH,
    reverse: true,
  })

  return (
    <main className="home">
      <div className="section_container">
        {width > CONSTANTS.SM && (
          <div
            className={`home_left ${isFileSectionDragging ? 'dragging' : ''}`}
            style={{ width: fileSectionW }}
          >
            <FileManager />
          </div>
        )}
        {width > CONSTANTS.SM && (
          <SectionSplitter isDragging={isFileSectionDragging} {...fileSectionDragBarProps} />
        )}
        <div className="home_right">
          <div className="editor">
            <TextEditor />
          </div>
          {width > CONSTANTS.XL && (
            <SectionSplitter isDragging={isTabsSectionDragging} {...tabsSectionDragBarProps} />
          )}
          {width > CONSTANTS.XL && (
            <div
              className={`tabs ${isTabsSectionDragging ? 'dragging' : ''}`}
              style={{ width: tabsSectionW }}
            >
              <Tabs />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
