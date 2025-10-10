"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { 
  Keyboard, 
  MousePointer2, 
  Square, 
  Circle, 
  Pencil, 
  ArrowRight, 
  Minus, 
  Type, 
  Eraser, 
  Frame,
  Copy,
  Clipboard,
  CopyPlus,
  Trash2,
  SquareCheck
} from 'lucide-react';

interface ShortcutItem {
  icon: React.ReactElement;
  action: string;
  shortcut: string;
  description: string;
}

const toolShortcuts: ShortcutItem[] = [
  {
    icon: <MousePointer2 className="w-4 h-4" />,
    action: "Select Tool",
    shortcut: "V",
    description: "Select and move shapes"
  },
  {
    icon: <Frame className="w-4 h-4" />,
    action: "Frame Tool",
    shortcut: "F",
    description: "Create frames to group content"
  },
  {
    icon: <Square className="w-4 h-4" />,
    action: "Rectangle Tool",
    shortcut: "R",
    description: "Draw rectangles and squares"
  },
  {
    icon: <Circle className="w-4 h-4" />,
    action: "Ellipse Tool",
    shortcut: "O",
    description: "Draw circles and ellipses"
  },
  {
    icon: <Pencil className="w-4 h-4" />,
    action: "Free Draw Tool",
    shortcut: "P",
    description: "Draw freehand paths"
  },
  {
    icon: <ArrowRight className="w-4 h-4" />,
    action: "Arrow Tool",
    shortcut: "A",
    description: "Draw arrows between points"
  },
  {
    icon: <Minus className="w-4 h-4" />,
    action: "Line Tool",
    shortcut: "L",
    description: "Draw straight lines"
  },
  {
    icon: <Type className="w-4 h-4" />,
    action: "Text Tool",
    shortcut: "T",
    description: "Add text labels"
  },
  {
    icon: <Eraser className="w-4 h-4" />,
    action: "Eraser Tool",
    shortcut: "E",
    description: "Erase shapes or strokes"
  }
];

const actionShortcuts: ShortcutItem[] = [
  {
    icon: <Copy className="w-4 h-4" />,
    action: "Copy",
    shortcut: "Ctrl+C",
    description: "Copy selected shapes"
  },
  {
    icon: <Clipboard className="w-4 h-4" />,
    action: "Paste",
    shortcut: "Ctrl+V",
    description: "Paste shapes from clipboard"
  },
  {
    icon: <CopyPlus className="w-4 h-4" />,
    action: "Duplicate",
    shortcut: "Ctrl+D",
    description: "Duplicate selected shapes"
  },
  {
    icon: <SquareCheck className="w-4 h-4" />,
    action: "Select All",
    shortcut: "Ctrl+A",
    description: "Select all shapes"
  },
  {
    icon: <Trash2 className="w-4 h-4" />,
    action: "Delete",
    shortcut: "Del",
    description: "Delete selected shapes"
  }
];

const navigationShortcuts: ShortcutItem[] = [
  {
    icon: <MousePointer2 className="w-4 h-4" />,
    action: "Hand Tool",
    shortcut: "Shift",
    description: "Hold to pan around canvas"
  },
  {
    icon: <SquareCheck className="w-4 h-4" />,
    action: "Clear Selection",
    shortcut: "Esc",
    description: "Deselect all shapes"
  }
];

export const KeyboardShortcutsDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const ShortcutSection: React.FC<{ title: string; shortcuts: ShortcutItem[] }> = ({ title, shortcuts }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground">
                {shortcut.icon}
              </div>
              <div>
                <div className="font-medium text-sm">{shortcut.action}</div>
                <div className="text-xs text-muted-foreground">{shortcut.description}</div>
              </div>
            </div>
            <Badge variant="secondary" className="font-mono text-xs">
              {shortcut.shortcut}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="w-4 h-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Learn all the keyboard shortcuts to work faster in the design editor.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <ShortcutSection title="Tools" shortcuts={toolShortcuts} />
          <ShortcutSection title="Actions" shortcuts={actionShortcuts} />
          <ShortcutSection title="Navigation" shortcuts={navigationShortcuts} />
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Hold <Badge variant="secondary" className="mx-1">Shift</Badge> to temporarily switch to hand tool for panning</li>
            <li>• Right-click on the canvas to access context menu with all actions</li>
            <li>• Use <Badge variant="secondary" className="mx-1">Ctrl+D</Badge> to quickly duplicate shapes</li>
            <li>• Press <Badge variant="secondary" className="mx-1">Esc</Badge> to clear selection and return to select tool</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
