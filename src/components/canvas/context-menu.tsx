"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { 
  copySelected, 
  pasteFromClipboard, 
  duplicateSelected, 
  deleteSelected,
  clearSelection,
  selectAll,
  setTool
} from '@/redux/slice/shapes';
import { useInfiniteCanvas } from '@/hooks/use-canvas';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { 
  Copy, 
  Clipboard, 
  CopyPlus, 
  Trash2, 
  MousePointer2,
  Square,
  Circle,
  Pencil,
  ArrowRight,
  Minus,
  Type,
  Eraser,
  Frame
} from 'lucide-react';

interface CanvasContextMenuProps {
  children: React.ReactNode;
}

export const CanvasContextMenu: React.FC<CanvasContextMenuProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedShapes, currentTool, shapes } = useInfiniteCanvas();
  
  const hasSelection = Object.keys(selectedShapes).length > 0;
  const hasShapes = shapes.length > 0;

  const handleCopy = () => {
    if (hasSelection) {
      dispatch(copySelected());
    }
  };

  const handlePaste = () => {
    dispatch(pasteFromClipboard({}));
  };

  const handleDuplicate = () => {
    if (hasSelection) {
      dispatch(duplicateSelected());
    }
  };

  const handleDelete = () => {
    if (hasSelection) {
      dispatch(deleteSelected());
    }
  };

  const handleSelectAll = () => {
    dispatch(selectAll());
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  const handleToolSelect = (tool: string) => {
    dispatch(setTool(tool as any));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        {/* Selection Actions */}
        {hasSelection && (
          <>
            <ContextMenuItem onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
              <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDuplicate}>
              <CopyPlus className="mr-2 h-4 w-4" />
              Duplicate
              <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
              <ContextMenuShortcut>Del</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        )}

        {/* Paste Action */}
        <ContextMenuItem onClick={handlePaste}>
          <Clipboard className="mr-2 h-4 w-4" />
          Paste
          <ContextMenuShortcut>Ctrl+V</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Selection Controls */}
        {hasShapes && (
          <>
            <ContextMenuItem onClick={handleSelectAll}>
              Select All
              <ContextMenuShortcut>Ctrl+A</ContextMenuShortcut>
            </ContextMenuItem>
            {hasSelection && (
              <ContextMenuItem onClick={handleClearSelection}>
                Clear Selection
                <ContextMenuShortcut>Esc</ContextMenuShortcut>
              </ContextMenuItem>
            )}
            <ContextMenuSeparator />
          </>
        )}

        {/* Tools */}
        <ContextMenuItem 
          onClick={() => handleToolSelect('select')}
          className={currentTool === 'select' ? 'bg-accent' : ''}
        >
          <MousePointer2 className="mr-2 h-4 w-4" />
          Select Tool
          <ContextMenuShortcut>V</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('frame')}
          className={currentTool === 'frame' ? 'bg-accent' : ''}
        >
          <Frame className="mr-2 h-4 w-4" />
          Frame Tool
          <ContextMenuShortcut>F</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('rect')}
          className={currentTool === 'rect' ? 'bg-accent' : ''}
        >
          <Square className="mr-2 h-4 w-4" />
          Rectangle Tool
          <ContextMenuShortcut>R</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('ellipse')}
          className={currentTool === 'ellipse' ? 'bg-accent' : ''}
        >
          <Circle className="mr-2 h-4 w-4" />
          Ellipse Tool
          <ContextMenuShortcut>O</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('freedraw')}
          className={currentTool === 'freedraw' ? 'bg-accent' : ''}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Free Draw Tool
          <ContextMenuShortcut>P</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('arrow')}
          className={currentTool === 'arrow' ? 'bg-accent' : ''}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Arrow Tool
          <ContextMenuShortcut>A</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('line')}
          className={currentTool === 'line' ? 'bg-accent' : ''}
        >
          <Minus className="mr-2 h-4 w-4" />
          Line Tool
          <ContextMenuShortcut>L</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('text')}
          className={currentTool === 'text' ? 'bg-accent' : ''}
        >
          <Type className="mr-2 h-4 w-4" />
          Text Tool
          <ContextMenuShortcut>T</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem 
          onClick={() => handleToolSelect('eraser')}
          className={currentTool === 'eraser' ? 'bg-accent' : ''}
        >
          <Eraser className="mr-2 h-4 w-4" />
          Eraser Tool
          <ContextMenuShortcut>E</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
