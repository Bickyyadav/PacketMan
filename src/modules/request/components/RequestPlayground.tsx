"use client";
import React, { useState } from "react";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import { Unplug } from "lucide-react";
import { useSaveRequest } from "../hooks/request";
import TabBar from "./TabBar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditor from "./RequestEditor";

const RequestPlayground = () => {
    const { tabs, addTab, activeTabId } = useRequestPlaygroundStore();
    const activeTab = tabs.find((t) => t.id === activeTabId);
    const [showSavedModel, setShowSavedModel] = useState(false)
    const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId)


    useHotkeys("ctrl+g,meta+shift+g", (e) => {
        e.preventDefault();
        e.stopPropagation();
        addTab()
        toast.success("New Request created successfully")
    }, {
        preventDefault: true,
        enableOnFormTags: true
    })



    // if (!activeTab) {
    //     return (
    //         <div className="flex space-y-4 flex-col h-full items-center justify-center">
    //             <div className="flex flex-col justify-center items-center h-40 w-40 border rounded-full bg-zinc-900">
    //                 <Unplug size={80} className='text-indigo-400' />
    //             </div>
    //             <div className="bg-zinc-900 p-4 rounded-lg space-y-2">
    //                 <div className="flex justify-between items-center gap-8">
    //                     <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">Ctrl+Shift+N</kbd>
    //                     <span className="text-zinc-400 font-semibold">New Request</span>
    //                 </div>
    //                 <div className="flex justify-between items-center gap-8">
    //                     <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">Ctrl+S</kbd>
    //                     <span className="text-zinc-400 font-semibold">Save Request</span>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    return <div className="flex flex-col h-full">
        <TabBar />
        <div className="">
            <RequestEditor/>
        </div>
    </div>;
};

export default RequestPlayground;
