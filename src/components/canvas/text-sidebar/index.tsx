"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { TextShape, updateShape } from "@/redux/slice/shapes";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Palette,
  Underline,
} from "lucide-react";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
};

const TextSidebar = ({ isOpen }: Props) => {
  const fontFamilies = [
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Lucida Console, monospace",
    "Verdana, sans-serif",
    "Trebuchet MS, sans-serif",
    "Palatino Linotype, serif",
    "Tahoma, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",
    "Segoe UI, sans-serif",
    "Roboto, sans-serif",
    "Open Sans, sans-serif",
    "Lato, sans-serif",
    "Montserrat, sans-serif",
    "Poppins, sans-serif",
    "Inter, sans-serif",
    "Merriweather, serif",
  ];

  const shapeEntities = useAppSelector((state) => state.shapes.shapes.entities);
  const selectedShape = useAppSelector((state) => state.shapes.selected);
  const dispatch = useAppDispatch();
  const [colorInput, setColorInput] = useState("#ffffff");

  const selectedTextShape = Object.keys(selectedShape)
    .map((id) => shapeEntities[id])
    .find((shape) => shape?.type === "text") as TextShape | undefined;

  const updateTextProperty = (property: keyof TextShape, value: any) => {
    if (!selectedTextShape) return;
    dispatch(
      updateShape({
        id: selectedTextShape.id,
        patch: { [property]: value },
      })
    );
  };

  const handleColorChange = (color: string) => {
    setColorInput(color);
    if (/^#[0-9A-F]{6}$/i.test(color) || /^#[0-9A-F]{3}$/i.test(color)) {
      updateTextProperty("fill", color);
    }
  };

  return (
    <div
      className={cn(
        "fixed right-5 top-1/2 transform -translate-y-1/2 w-80 backdrop-blur-xl bg-white/[0.08] border-white/[0.12] p-3 saturate-150 border rounded-lg z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="p-4 flex flex-col space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {/* Font Family */}
        <div className="space-y-2">
          <Label className="text-white/80">Font Family</Label>
          <Select
            value={selectedTextShape?.fontFamily}
            onValueChange={(value) => updateTextProperty("fontFamily", value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 w-full text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/10">
              {fontFamilies.map((font) => (
                <SelectItem
                  key={font}
                  value={font}
                  className="text-white hover:bg-white/10"
                >
                  <span style={{ fontFamily: font }}>{font.split(",")[0]}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label className="text-white/80">
            Font Size : {selectedTextShape?.fontSize}px
          </Label>
          <Slider
            value={[selectedTextShape?.fontSize ?? 16]}
            onValueChange={([value]) => updateTextProperty("fontSize", value)}
            min={8}
            max={120}
            step={1}
            className="w-full"
          />
        </div>

        {/* Font Weight */}
        <div className="space-y-2">
          <Label className="text-white/80">
            Font Weight : {selectedTextShape?.fontWeight}
          </Label>
          <Slider
            value={[selectedTextShape?.fontWeight ?? 400]}
            onValueChange={([value]) => updateTextProperty("fontWeight", value)}
            min={100}
            max={900}
            step={100}
            className="w-full"
          />
        </div>

        {/* Style (Bold / Italic / Underline) */}
        <div className="space-y-2">
          <Label className="text-white/80">Style</Label>
          <div className="flex gap-2">
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={(selectedTextShape?.fontWeight ?? 400) >= 600}
              onPressedChange={(pressed) =>
                updateTextProperty("fontWeight", pressed ? 700 : 400)
              }
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={selectedTextShape?.fontStyle === "italic"}
              onPressedChange={(pressed) =>
                updateTextProperty("fontStyle", pressed ? "italic" : "normal")
              }
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={selectedTextShape?.textDecoration === "underline"}
              onPressedChange={(pressed) =>
                updateTextProperty(
                  "textDecoration",
                  pressed ? "underline" : "none"
                )
              }
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="space-y-2">
          <Label className="text-white/80">
            Letter Spacing : {selectedTextShape?.letterSpacing}
          </Label>
          <Slider
            value={[selectedTextShape?.letterSpacing ?? 0]}
            onValueChange={([value]) =>
              updateTextProperty("letterSpacing", value)
            }
            min={-10}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        {/* Line Height */}
        <div className="space-y-2">
          <Label className="text-white/80">
            Line Height : {selectedTextShape?.lineHeight}
          </Label>
          <Slider
            value={[selectedTextShape?.lineHeight ?? 16]}
            onValueChange={([value]) => updateTextProperty("lineHeight", value)}
            min={8}
            max={120}
            step={1}
            className="w-full"
          />
        </div>

        {/* Text Align */}
        <div className="space-y-2">
          <Label className="text-white/80">Text Align</Label>
          <div className="flex gap-2">
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={selectedTextShape?.textAlign === "left"}
              onPressedChange={() => updateTextProperty("textAlign", "left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={selectedTextShape?.textAlign === "center"}
              onPressedChange={() => updateTextProperty("textAlign", "center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
              pressed={selectedTextShape?.textAlign === "right"}
              onPressedChange={() => updateTextProperty("textAlign", "right")}
            >
              <AlignRight className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        {/* Text Transform */}
        <div className="space-y-2">
          <Label className="text-white/80">Text Transform</Label>
          <div className="flex gap-2">
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white text-xs font-medium"
              pressed={selectedTextShape?.textTransform === "none"}
              onPressedChange={() =>
                updateTextProperty("textTransform", "none")
              }
            >
              N/A
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white text-xs font-medium uppercase"
              pressed={selectedTextShape?.textTransform === "uppercase"}
              onPressedChange={() =>
                updateTextProperty("textTransform", "uppercase")
              }
            >
              Aa
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white text-xs font-medium lowercase"
              pressed={selectedTextShape?.textTransform === "lowercase"}
              onPressedChange={() =>
                updateTextProperty("textTransform", "lowercase")
              }
            >
              aa
            </Toggle>
            <Toggle
              className="data-[state=on]:bg-blue-500 data-[state=on]:text-white text-xs font-medium capitalize"
              pressed={selectedTextShape?.textTransform === "capitalize"}
              onPressedChange={() =>
                updateTextProperty("textTransform", "capitalize")
              }
            >
              Aa
            </Toggle>
          </div>
          <div className="space-y-2 mt-4">
            <Label className="text-white/80 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Text Color
            </Label>
            <div className="flex gap-2">
              <Input
                value={colorInput}
                onChange={(e : any) => handleColorChange(e.target.value)}
                placeholder="#ffffff"
                className="bg-white/5 border-white/10 w-full text-white flex-1"
              />
              <div className="w-10 h-10 rounded border border-white/20 cursor-pointer"
              style={{ backgroundColor: selectedTextShape?.fill || '#ffffff' }}
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'color'
                input.value = selectedTextShape?.fill || '#ffffff'
                input.onchange = (e) => {
                  const color = (e.target as HTMLInputElement).value
                  setColorInput(color)
                  updateTextProperty('fill', color)
                }
                input.click()
              }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSidebar;
