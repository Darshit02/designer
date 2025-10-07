import React from 'react'
import HistoryPill from './history'
import ZoomBar from './zoom'
import ToolbarShapes from './shapes'

type Props = {}

const Toolbar = (props: Props) => {
  return (
    <div className='fixed bottom-0 w-full grid grid-cols-3 z-50 p-5'>
      <HistoryPill/>
      <ToolbarShapes/>
      <ZoomBar/>
    </div>
  )
}

export default Toolbar