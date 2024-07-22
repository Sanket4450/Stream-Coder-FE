export const folderStructure = [
  {
    id: 1,
    name: 'app.js',
    type: 'file',
  },
  {
    id: 2,
    name: 'folder1',
    type: 'folder',
    children: [
      {
        id: 3,
        name: 'auth.js',
        type: 'file',
      },
      {
        id: 4,
        name: 'user.js',
        type: 'file',
      },
    ],
  },
  {
    id: 5,
    name: 'folder2',
    type: 'folder',
    children: [
      {
        id: 6,
        name: 'subfolder1',
        type: 'folder',
        children: [
          {
            id: 7,
            name: 'validation.js',
            type: 'file',
          },
          {
            id: 8,
            name: 'schema.txt',
            type: 'file',
          },
        ],
      },
      {
        id: 9,
        name: 'subfolder2',
        type: 'folder',
        children: [],
      },
    ],
  },
  {
    id: 10,
    name: 'index.js',
    type: 'file',
  },
  {
    id: 11,
    name: 'server.js',
    type: 'file',
  },
]
