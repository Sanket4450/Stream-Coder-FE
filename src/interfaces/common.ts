export interface Tab {
  value: string
  label: string
}

export interface FileType {
  id: string | number
  name: string
  type: 'file'
}

export interface FolderType {
  id: string | number
  name: string
  type: 'folder'
  children: Array<FileType | FolderType>
}

export interface EmptyObj {
  open: boolean
  data: any
}
