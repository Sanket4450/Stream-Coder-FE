import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { MdEdit } from 'react-icons/md'
import { FaFile, FaFolder, FaFolderOpen } from 'react-icons/fa6'

// local imports
import './styles/Folder.scss'
import { AddChildFileType, FolderType } from '../../../interfaces/file'
import { File } from './File'
import { CONSTANTS } from '../../../helper/constants'
import { useAppDispatch } from '../../../hooks/redux'
import { openDeleteFileModal } from '../../../store/slices/modal'
import { FileLogo } from '../../ui/FileLogo'
import { useAddFileMutation } from '../../../api/file'
import { MSG } from '../../../helper/messages'

export const Folder: FC<{
  folder: FolderType
  indent: number
  unsplit: boolean
  setUnsplit: Dispatch<SetStateAction<boolean>>
}> = ({ folder, indent, unsplit, setUnsplit }) => {
  const [editing, setEditing] = useState<{ type: null | string }>({ type: null })
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('')
  const [folderName, setFolderName] = useState<string>('')

  const [addFileApi] = useAddFileMutation()

  const dispatch = useAppDispatch()

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

  const addFileOrFolder = async (data: AddChildFileType) => {
    try {
      const response = await addFileApi(data)
      console.log(response)

      if (response.data?.success === CONSTANTS.SUCCESS_TRUE) {
        console.log('file added successfully')
      } else {
        console.log(MSG.SOMETHING_WENT_WRONG)
      }
    } catch (error: any) {
      console.log(MSG.SOMETHING_WENT_WRONG)
    }
  }

  const openFileInput = (e: any) => {
    e.stopPropagation()
    setIsOpen(true)
    setEditing({ type: CONSTANTS.FILE_VALUE })
  }

  const openFolderInput = (e: any) => {
    e.stopPropagation()
    setIsOpen(true)
    setEditing({ type: CONSTANTS.FOLDER_VALUE })
  }

  const handleFileName = (e: any) => {
    setFileName(e.target.value.trim())
  }

  const handleFileBlur = () => {
    setEditing({ type: null })
  }

  const handleFileKeyPress = (e: any) => {
    if (e.key === CONSTANTS.ENTER) {
      fileName && addFileOrFolder({ name: fileName, type: 'file', parent_folder_id: folder.id })
      setFileName('')
      setEditing({ type: null })
    }
  }

  const handleFolderName = (e: any) => {
    setFolderName(e.target.value.trim())
  }

  const handleFolderBlur = () => {
    setEditing({ type: null })
  }

  const handleFolderKeyPress = (e: any) => {
    if (e.key === CONSTANTS.ENTER) {
      folderName &&
        addFileOrFolder({ name: folderName, type: 'folder', parent_folder_id: folder.id })
      setFolderName('')
      setEditing({ type: null })
    }
  }

  const handleOpenDeleteModal = (e: any) => {
    e.stopPropagation()
    dispatch(openDeleteFileModal({ ...folder }))
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
      >
        <div className="folder_left" style={indentStyle}>
          {isOpen ? <FaFolderOpen className="folder_icon" /> : <FaFolder className="folder_icon" />}
          <h4 className="name">{folder.name}</h4>
        </div>
        {isHovered && (
          <div className="folder_right">
            <MdEdit className="icon" />
            <FaFile className="icon" onClick={openFileInput} />
            <FaFolder className="icon" onClick={openFolderInput} />
            <TiDelete className="icon" onClick={handleOpenDeleteModal} />
          </div>
        )}
      </div>
      {editing.type === CONSTANTS.FOLDER_VALUE && (
        <div className="editing">
          <FaFolder className="folder_icon" />
          <input
            type="text"
            className="edit_input"
            placeholder={MSG.ENTER_FOLDER_NAME}
            value={folderName}
            onChange={handleFolderName}
            onBlur={handleFolderBlur}
            onKeyDown={handleFolderKeyPress}
            autoFocus
          />
        </div>
      )}
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
      {editing.type === CONSTANTS.FILE_VALUE && (
        <div className="editing">
          <FileLogo filename={fileName} />
          <input
            type="text"
            className="edit_input"
            placeholder={MSG.ENTER_FILE_NAME}
            value={fileName}
            onChange={handleFileName}
            onBlur={handleFileBlur}
            onKeyDown={handleFileKeyPress}
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
