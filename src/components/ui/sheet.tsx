"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

function SheetContent({
  className,
  children,
  ...props
}: SheetPrimitive.Popup.Props) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop
        data-slot="sheet-overlay"
        className="sheet-overlay"
      />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        className={cn("sheet-content", className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
};
