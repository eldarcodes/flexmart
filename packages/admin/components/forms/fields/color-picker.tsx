"use client";

import { TwitterPicker } from "react-color";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ColorPickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPickerField({ value, onChange }: ColorPickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-3">
          <div>Select:</div>

          <div className="p-[6px] h-10 border rounded-md shadow-sm grow max-w-28">
            <div
              className="w-full h-full rounded-md shadow-sm"
              style={{ backgroundColor: value || "#fff" }}
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <TwitterPicker
          color={value}
          triangle="hide"
          styles={{
            default: {
              card: {
                boxShadow: "none",
              },
            },
          }}
          onChange={(color) => {
            onChange(color.hex);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
