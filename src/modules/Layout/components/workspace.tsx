import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Hint } from '@/components/ui/hint';
import { Button } from '@/components/ui/button';
import { Loader, User } from 'lucide-react';
import { useWorkspaces } from '@/modules/workspace/hooks/workspace';

const Workspace = () => {

    const { data: workspaces, isLoading } = useWorkspaces()

    if (isLoading) {
        <Loader className='animate-spin size-4 text-indigo-500' />
    }

    if (!workspaces || workspaces.length === 0) {
        return <div className='font-semibold text-indigo-500'>No Workspace Found</div>
    }


    return (
        <>
            <Hint label='Change Workspace'>
                <Button className="border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1">
                    <User className="size-4 text-indigo-400" />
                    <span className="text-sm text-indigo-400 font-semibold">
                        {/* <SelectValue placeholder="Select workspace" /> */}
                        Personal workspace
                    </span>
                </Button>
            </Hint>
        </>
    )
}

export default Workspace
