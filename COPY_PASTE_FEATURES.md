# Copy-Paste Feature & Keyboard Shortcuts

## Overview
This update adds comprehensive copy-paste functionality and keyboard shortcuts to the design application, making it much more efficient to work with shapes and tools.

## New Features

### 1. Copy-Paste Operations
- **Copy**: `Ctrl+C` - Copy selected shapes to clipboard
- **Paste**: `Ctrl+V` - Paste shapes from clipboard with offset
- **Duplicate**: `Ctrl+D` - Duplicate selected shapes in place with small offset
- **Delete**: `Del` or `Backspace` - Delete selected shapes

### 2. Keyboard Shortcuts for Tools
- **V** - Select Tool
- **F** - Frame Tool  
- **R** - Rectangle Tool
- **O** - Ellipse Tool
- **P** - Free Draw Tool
- **A** - Arrow Tool
- **L** - Line Tool
- **T** - Text Tool
- **E** - Eraser Tool

### 3. Selection & Navigation
- **Ctrl+A** - Select All shapes
- **Esc** - Clear selection
- **Shift** - Hold to temporarily switch to hand tool for panning

### 4. Context Menu
Right-click on the canvas to access a context menu with:
- Copy/Paste/Duplicate options
- Delete selected shapes
- Quick tool selection
- Select All/Clear Selection

### 5. Visual Indicators
- Tooltips now show keyboard shortcuts
- Keyboard shortcuts dialog accessible from toolbar
- Context menu shows all available actions with shortcuts

## Technical Implementation

### Redux State Management
- Added `clipboard` array to store copied shapes
- New actions: `copySelected`, `pasteFromClipboard`, `duplicateSelected`
- Proper shape offset handling for different shape types

### Keyboard Event Handling
- Enhanced `onKeyDown` handler in `useInfiniteCanvas` hook
- Support for both Ctrl/Cmd and single-key shortcuts
- Proper event prevention and handling

### UI Components
- `CanvasContextMenu` - Right-click context menu
- `KeyboardShortcutsDialog` - Help dialog showing all shortcuts
- Updated toolbar with shortcut indicators

## Usage Examples

1. **Quick Shape Duplication**:
   - Select a shape
   - Press `Ctrl+D` to duplicate it
   - Press `Ctrl+D` again to create more copies

2. **Tool Switching**:
   - Press `R` to switch to rectangle tool
   - Draw a rectangle
   - Press `V` to switch back to select tool

3. **Copy Between Projects**:
   - Select shapes and press `Ctrl+C`
   - Switch to another canvas
   - Press `Ctrl+V` to paste

4. **Context Menu Access**:
   - Right-click anywhere on canvas
   - Choose from available actions
   - See keyboard shortcuts for each action

## Benefits
- **Faster Workflow**: Keyboard shortcuts eliminate need to click toolbar buttons
- **Better UX**: Context menu provides quick access to common actions
- **Professional Feel**: Standard shortcuts (Ctrl+C, Ctrl+V) work as expected
- **Discoverability**: Help dialog and tooltips show available shortcuts
- **Efficiency**: Duplicate and copy-paste operations save significant time
