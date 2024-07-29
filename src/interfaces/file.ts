export interface FolderStructure {
  id: number
  type: 'file' | 'folder'
  name: string
  children: FolderStructure[]
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
  children: (FileType | FolderType)[]
}

export interface AddFileType {
  name: string
  type: 'file' | 'folder'
}

export interface AddChildFileType {
  name: string
  type: 'file' | 'folder'
  parent_folder_id: string | number
}
