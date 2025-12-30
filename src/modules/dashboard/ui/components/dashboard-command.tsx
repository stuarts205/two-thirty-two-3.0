import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React, { Dispatch, SetStateAction } from 'react'

interface DashboardCommandProps {
    open?: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
            placeholder="Search for slides..."
        />
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  )
}
