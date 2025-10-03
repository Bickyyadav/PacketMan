"use client";
import React, { useState } from "react";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import { Unplug } from "lucide-react";
import { useSaveRequest } from "../hooks/request";
import TabBar from "./TabBar";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import RequestEditor from "./RequestEditor";
import { REST_METHOD } from "@prisma/client";
import AddRequestCollectionModal from "@/modules/collections/components/AddRequestCollectionModal";

const RequestPlayground = () => {
    const { tabs, addTab, activeTabId } = useRequestPlaygroundStore();
    const activeTab = tabs.find((t) => t.id === activeTabId);
    const [showSaveModel, setShowSaveModel] = useState(false)
    const { mutateAsync, isPending } = useSaveRequest(activeTab?.requestId)


    const getCurrentRequestData = () => {
        if (!activeTab) {
            return {
                name: "Untitled Request",
                url: "https://echo.hoppscotch.io",
                method: REST_METHOD.GET as REST_METHOD
            }
        }
        return {
            name: activeTab.title,
            method: (activeTab.method as REST_METHOD),
            url: activeTab.url
        }
    }

    useHotkeys("ctrl+s,meta+s",
        async (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (!activeTab) {
                toast.error("No active request to save")
                return
            }
            if (activeTab.collectionId) {
                try {
                    await mutateAsync({
                        url: activeTab.url || "https://echo.hoppscotch.io",
                        method: activeTab.method as REST_METHOD,
                        name: activeTab.title || "Untitled Request",
                        body: activeTab.body,
                        headers: activeTab.headers,
                        parameters: activeTab.parameters,
                    })
                    toast.success("Request updated");
                } catch (error) {
                    console.error("Failed to update request:", error);
                    toast.error("Failed to update request");

                }
            } else {
                setShowSaveModel(true)
            }
        },
        {
            preventDefault: true,
            enableOnFormTags: true
        },
        [activeTab]
    )

    useHotkeys("ctrl+g,meta+shift+g", (e) => {
        e.preventDefault();
        e.stopPropagation();
        addTab()
        toast.success("New Request created successfully")
    }, {
        preventDefault: true,
        enableOnFormTags: true
    })



    if (!activeTab) {
        return (
            <div className="flex space-y-4 flex-col h-full items-center justify-center">
                <div className="flex flex-col justify-center items-center h-40 w-40 border rounded-full bg-zinc-900">
                    <Unplug size={80} className='text-indigo-400' />
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-center gap-8">
                        <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">Ctrl+Shift+N</kbd>
                        <span className="text-zinc-400 font-semibold">New Request</span>
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <kbd className="px-2 py-1 bg-zinc-800 text-indigo-400 text-sm rounded border">Ctrl+S</kbd>
                        <span className="text-zinc-400 font-semibold">Save Request</span>
                    </div>
                </div>
            </div>
        );
    }
    return <div className="flex flex-col h-full">
        <TabBar />
        <div className="">
            <RequestEditor />
        </div>
        <AddRequestCollectionModal isModalOpen={showSaveModel} setIsModalOpen={setShowSaveModel} requestData={getCurrentRequestData()} initialName={getCurrentRequestData().name} />
    </div>;
};

export default RequestPlayground;
