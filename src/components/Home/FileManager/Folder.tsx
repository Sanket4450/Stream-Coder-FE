import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { MdEdit } from 'react-icons/md'
import { FaFile, FaFolder, FaFolderOpen } from 'react-icons/fa6'

// local imports
import './styles/Folder.scss'
import { FolderType } from '../../../interfaces/common'
import { File } from './File'
import { CONSTANTS } from '../../../helper/constants'

export const Folder: FC<{
  folder: FolderType
  indent: number
  unsplit: boolean
  setUnsplit: Dispatch<SetStateAction<boolean>>
}> = ({ folder, indent, unsplit, setUnsplit }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    isOpen && setUnsplit(false)
  }, [isOpen])

  useEffect(() => {
    unsplit && setIsOpen(false)
  }, [unsplit])

  const indentStyle = {
    paddingLeft: indent,
  }

  const handleMoustOver = () => {
    setIsHovered(true)
  }

  const handleMoustOut = () => {
    setIsHovered(false)
  }

  const toggleFolder = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="folder">
      <div
        className="topbar"
        onMouseOver={handleMoustOver}
        onMouseOut={handleMoustOut}
        onClick={toggleFolder}
        style={indentStyle}
      >
        <div className="folder_left">
          {isOpen ? <FaFolderOpen className="folder_icon" /> : <FaFolder className="folder_icon" />}
          <h4 className="name">{folder.name}</h4>
        </div>
        {isHovered && (
          <div className="folder_right">
            <MdEdit className="icon" />
            <FaFile className="icon" />
            <FaFolder className="icon" />
            <TiDelete className="icon" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="contents">
          {folder.children.map((child) =>
            child.type === 'file' ? (
              <File key={child.id} file={child} indent={indent + CONSTANTS.FILE_INDENTATION} />
            ) : (
              <Folder
                key={child.id}
                folder={child}
                indent={indent + CONSTANTS.FILE_INDENTATION}
                unsplit={unsplit}
                setUnsplit={setUnsplit}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}
