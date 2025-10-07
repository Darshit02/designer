"use client"
import { Button } from '@/components/ui/button'
import { useInfiniteCanvas } from '@/hooks/use-canvas'
import { cn } from '@/lib/utils'
import { Tool } from '@/redux/slice/shapes'
import { MousePointer2, SquareDashed, Square, Circle, Pencil, ArrowRight, Minus, Type, Eraser, Frame } from 'lucide-react'
import React from 'react'

type Props = {}

const tools : Array<{
    id :Tool
    icon : React.ReactElement
    label : string
    description : string
    shortcut : string
}> = [
    {
        id : 'select',
        icon : <MousePointer2 className='w-4 h-4' />,
        label : "Select",
        description : "Select and Move Shapes",
        shortcut : "V"
    },
    {
        id: 'frame',
        icon: <Frame className='w-4 h-4' />,
        label: 'Frame',
        description: 'Create frames to group content',
        shortcut : "F"
    },
    {
        id: 'rect',
        icon: <Square className='w-4 h-4' />,
        label: 'Rectangle',
        description: 'Draw rectangles and squares',
        shortcut : "R"
    },
    {
        id: 'ellipse',
        icon: <Circle className='w-4 h-4' />,
        label: 'Ellipse',
        description: 'Draw circles and ellipses',
        shortcut : "O"
    },
    {
        id: 'freedraw',
        icon: <Pencil className='w-4 h-4' />,
        label: 'Free Draw',
        description: 'Draw freehand paths',
        shortcut : "P"
    },
    {
        id: 'arrow',
        icon: <ArrowRight className='w-4 h-4' />,
        label: 'Arrow',
        description: 'Draw arrows between points',
        shortcut : "A"
    },
    {
        id: 'line',
        icon: <Minus className='w-4 h-4' />,
        label: 'Line',
        description: 'Draw straight lines',
        shortcut : "L"
    },
    {
        id: 'text',
        icon: <Type className='w-4 h-4' />,
        label: 'Text',
        description: 'Add text labels',
        shortcut : "T"
    },
    {
        id: 'eraser',
        icon: <Eraser className='w-4 h-4' />,
        label: 'Eraser',
        description: 'Erase shapes or strokes',
        shortcut : "E"
    }
]

const ToolbarShapes = (props: Props) => {
    const {currentTool ,selectTool} = useInfiniteCanvas()
  return (
    <div className='col-span-1 flex justify-center items-center'>
        <div className="flex items-center backdrop-blur-xl backdrop-[url('#displacementFilter')] bg-white/[0.08] border border-white/[0.12] gap-2 rounded-full p-3 saturate-150">
        {

        tools.map((tool) => (
            <Button
            key={tool.id}
            variant={'ghost'}
            size={"lg"}
            onClick={() => selectTool(tool.id)}
            className={cn('cursor-pointer rounded-full p-3', currentTool === tool.id ? "text-primary/100 bg-white/[0.12] border border-white/[0.16]" : 'text-primary/50 hover:bg-white/[0.06] border border-transparent')}
            title={`${tool.label} - ${tool.description} (${tool.shortcut})`}
            >
                {tool.icon}
            </Button>
        ))
        }</div>
    </div>
  )
}

export default ToolbarShapes