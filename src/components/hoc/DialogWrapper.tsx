"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { setCloseDialog } from "@/lib/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const DialogWrapper = () => {
  const { open, child } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch()

  return (
    <Dialog open={open} onOpenChange={()=>{dispatch(setCloseDialog())}}>
      <DialogContent>{child}</DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
