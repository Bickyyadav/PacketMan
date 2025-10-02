import { Input } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import React, { useState } from 'react'
import { useCreateCollection } from '../hooks/collection'
import { toast } from 'sonner'




const CreateCollection = ({ workspaceId, isModalOpen, setIsModalOpen }: {
    workspaceId: string;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}) => {
    const [name, setName] = useState("")
    const { mutateAsync, isPending } = useCreateCollection(workspaceId)

    const handleSubmit = async () => {
        if (!name.trim()) {
            return
        }
        try {
            await mutateAsync(name)
            toast.success("collection created successfully")
            setName("")
            setIsModalOpen(false)
        } catch (error) {
            toast.error("failed to created successfully")
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }
    }
    return (
        <Modal
            title="Add New collection"
            description="Create a new collection to organize your projects"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            submitText={isPending ? "Creating..." : "Create collection"}
            submitVariant="default">
            <div className='space-y-4'>
                <Input className='w-full p-2 border rounded-sm' placeholder='' value={name} onChange={(e) => setName(e.target.value)} />
            </div>

        </Modal>
    )
}

export default CreateCollection
