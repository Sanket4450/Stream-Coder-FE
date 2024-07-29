import { Modal, Box, SxProps } from '@mui/material'
import { IoMdClose } from 'react-icons/io'

// local imports
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { closeDeleteFileModal } from '../../store/slices/modal'
import { CONSTANTS } from '../../helper/constants'
import './styles/DeleteFileModal.scss'
import './styles/__global.scss'
import { MSG } from '../../helper/messages'
import { useDeleteFileMutation } from '../../api/file'

const style: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '400px',
  bgcolor: 'var(--primary_bg)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  border: '0.5px solid var(--light_text)',
  borderRadius: '5px',
  boxShadow: 24,
  p: 3,
  outline: 'none',
}

export const DeleteFileModal = () => {
  const deleteFileModal = useAppSelector((state) => state.modal.deleteFile)

  const [deleteFileApi] = useDeleteFileMutation()

  const dispatch = useAppDispatch()

  const handleCloseModal = () => {
    dispatch(closeDeleteFileModal())
  }

  const deleteFile = async () => {
    try {
      const response = await deleteFileApi({ id: deleteFileModal.data.id })

      if (response.data?.success === CONSTANTS.SUCCESS_TRUE) {
        console.log('file deleted successfully')
        handleCloseModal()
      } else {
        console.log(MSG.SOMETHING_WENT_WRONG)
      }
    } catch (error) {
      console.log(MSG.SOMETHING_WENT_WRONG)
    }
  }

  return (
    <div>
      <Modal open={deleteFileModal.open} onClose={handleCloseModal}>
        <Box sx={style}>
          <div className="delete_modal_title">
            <h3 className="delete_modal_title_text">
              {CONSTANTS.DELETE}{' '}
              {deleteFileModal.data.type === CONSTANTS.FOLDER_VALUE
                ? CONSTANTS.FOLDER
                : CONSTANTS.FILE}
            </h3>
            <IoMdClose className="close_modal_icon" onClick={handleCloseModal} />
          </div>
          <div className="delete_modal_description">
            <p>
              {MSG.DELETE_WARNING}{' '}
              <span className="delete_file_name">{deleteFileModal.data.name}</span>?
            </p>
            <p>{MSG.FILE_DELETE_WARNING}</p>
          </div>
          <div className="modal_action_buttons">
            <button className="modal_cancel_btn" onClick={handleCloseModal}>
              {CONSTANTS.CANCEL}
            </button>
            <button className="modal_delete_btn" onClick={deleteFile}>
              {CONSTANTS.DELETE}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
