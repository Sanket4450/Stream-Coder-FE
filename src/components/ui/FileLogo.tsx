import { FC } from 'react'
import { FaRegFile } from 'react-icons/fa'

// local imports
import C from '../../assets/svgs/c.svg'
import CPP from '../../assets/svgs/cpp.svg'
import CS from '../../assets/svgs/csharp.svg'
import CSS from '../../assets/svgs/css.svg'
import GO from '../../assets/svgs/go.svg'
import HTML from '../../assets/svgs/html.svg'
import JAVA from '../../assets/svgs/java.svg'
import JS from '../../assets/svgs/javascript.svg'
import KOTLIN from '../../assets/svgs/kotlin.svg'
import PYTHON from '../../assets/svgs/python.svg'
import REACT from '../../assets/svgs/react.svg'
import RUBY from '../../assets/svgs/ruby.svg'
import SWIFT from '../../assets/svgs/swift.svg'
import TS from '../../assets/svgs/typescript.svg'
import { EXT } from '../../helper/extensions'
import './styles/FileLogo.scss'

export const FileLogo: FC<{ filename: string }> = ({ filename }) => {
  const extension = filename.split('.').pop()

  switch (extension) {
    case EXT.C:
      return <img className="file_logo" src={C} alt="" />
    case EXT.CPP:
      return <img className="file_logo" src={CPP} alt="" />
    case EXT.CP:
      return <img className="file_logo" src={CPP} alt="" />
    case EXT.CS:
      return <img className="file_logo" src={CS} alt="" />
    case EXT.CSS:
      return <img className="file_logo" src={CSS} alt="" />
    case EXT.GO:
      return <img className="file_logo" src={GO} alt="" />
    case EXT.HTML:
      return <img className="file_logo" src={HTML} alt="" />
    case EXT.HTM:
      return <img className="file_logo" src={HTML} alt="" />
    case EXT.JAVA:
      return <img className="file_logo" src={JAVA} alt="" />
    case EXT.JS:
      return <img className="file_logo" src={JS} alt="" />
    case EXT.KOTLIN:
      return <img className="file_logo" src={KOTLIN} alt="" />
    case EXT.PYTHON:
      return <img className="file_logo" src={PYTHON} alt="" />
    case EXT.JSX:
      return <img className="file_logo" src={REACT} alt="" />
    case EXT.TSX:
      return <img className="file_logo" src={REACT} alt="" />
    case EXT.RUBY:
      return <img className="file_logo" src={RUBY} alt="" />
    case EXT.SWIFT:
      return <img className="file_logo" src={SWIFT} alt="" />
    case EXT.TS:
      return <img className="file_icon" src={TS} alt="" />
    default:
      return <FaRegFile />
  }
}
