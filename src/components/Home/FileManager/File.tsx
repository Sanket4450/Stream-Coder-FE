import { FC, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { MdEdit } from 'react-icons/md'

// local imports
import './styles/File.scss'
import { FileType } from '../../../interfaces/common'
import { FileLogo } from '../../ui/FileLogo'
import { openDeleteFileModal } from '../../../store/slices/modal'
import { useAppDispatch } from '../../../hooks/redux'
import { CONSTANTS } from '../../../helper/constants'

export const File: FC<{ file: FileType; indent: number }> = ({ file, indent }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const indentStyle = {
    paddingLeft: indent,
  }

  const handleMoustOver = () => {
    setIsHovered(true)
  }

  const handleMoustOut = () => {
    setIsHovered(false)
  }

  const handleOpenModal = () => {
    dispatch(openDeleteFileModal({ type: CONSTANTS.FILE_VALUE, file }))
  }

  return (
    <div
      className="file"
      onMouseOver={handleMoustOver}
      onMouseOut={handleMoustOut}
      style={indentStyle}
    >
      <div className="file_left">
        <FileLogo filename={file.name} />
        <h4 className="name">{file.name}</h4>
      </div>
      {isHovered && (
        <div className="file_right">
          <MdEdit className="icon" />
          <TiDelete className="icon" onClick={handleOpenModal} />
        </div>
      )}
    </div>
  )
}
