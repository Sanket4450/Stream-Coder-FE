import { FC, useEffect, useState } from 'react'
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io'
import { FaFile, FaFolder } from 'react-icons/fa6'
import { VscFiles } from 'react-icons/vsc'

// local imports
import './styles/index.scss'
import { CONSTANTS } from '../../../helper/constants'
import { File } from './File'
import { Folder } from './Folder'
import { AddFileType, FileType, FolderType } from '../../../interfaces/file'
import { MSG } from '../../../helper/messages'
import { FileLogo } from '../../ui/FileLogo'
import { useAppSelector } from '../../../hooks/redux'
import { DeleteFileModal } from '../../modals/DeleteFileModal'
import { useAddFileMutation, useGetFolderStructureQuery } from '../../../api/file'

export const FileManager: FC = () => {
  const deleteFileModal = useAppSelector((state) => state.modal.deleteFile)

  const [filesOpen, setFilesOpen] = useState<boolean>(true)
  const [unsplit, setUnsplit] = useState<boolean>(true)
  const [editing, setEditing] = useState<{ type: null | string }>({ type: null })
  const [folderStructure, setFolderStructure] = useState<Array<FileType | FolderType>>([])
  const [fileName, setFileName] = useState<string>('')
  const [folderName, setFolderName] = useState<string>('')

  const { data: structureData } = useGetFolderStructureQuery({})

  const [addFileApi] = useAddFileMutation()

  useEffect(() => {
    if (structureData?.success) {
      setFolderStructure(structureData.results)
    }
  }, [structureData])

  const addFileOrFolder = async (data: AddFileType) => {
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

  const openFileInput = () => {
    setEditing({ type: CONSTANTS.FILE_VALUE })
  }

  const openFolderInput = () => {
    setEditing({ type: CONSTANTS.FOLDER_VALUE })
  }

  const unsplitFolders = () => {
    setUnsplit(true)
  }

  const handleFileName = (e: any) => {
    setFileName(e.target.value.trim())
  }

  const handleFileBlur = () => {
    setEditing({ type: null })
  }

  const handleFileKeyPress = (e: any) => {
    if (e.key === CONSTANTS.ENTER) {
      fileName && addFileOrFolder({ name: fileName, type: 'file' })
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
      folderName && addFileOrFolder({ name: folderName, type: 'folder' })
      setFolderName('')
      setEditing({ type: null })
    }
  }

  return (
    <aside className="file_manager_section">
      <section className="files_section">
        <div className="topbar">
          <div className="files_section_left" onClick={() => setFilesOpen(!filesOpen)}>
            {filesOpen ? (
              <IoMdArrowDropdown className="files_arrow" />
            ) : (
              <IoMdArrowDropright className="files_arrow" />
            )}
            <h4 className="files_title">{CONSTANTS.FILES}</h4>
          </div>
          <div className="files_section_right">
            <FaFile className="icon" onClick={openFileInput} />
            <FaFolder className="icon" onClick={openFolderInput} />
            <VscFiles className="icon" onClick={unsplitFolders} />
          </div>
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
        {filesOpen && (
          <div className="list">
            {folderStructure.map((item) =>
              item.type === 'file' ? (
                <File key={item.id} file={item as FileType} indent={CONSTANTS.FILE_INDENTATION} />
              ) : (
                <Folder
                  key={item.id}
                  folder={item as FolderType}
                  unsplit={unsplit}
                  setUnsplit={setUnsplit}
                  indent={CONSTANTS.FILE_INDENTATION}
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
        {deleteFileModal.open && <DeleteFileModal />}
      </section>
    </aside>
  )
}
