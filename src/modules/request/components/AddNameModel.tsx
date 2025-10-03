import React, { useEffect, useState } from "react";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
import { toast } from "sonner";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const AddNameModel = ({
  isModalOpen,
  setIsModalOpen,
  tabId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  tabId: string;
}) => {
  const { updateTab, tabs, markUnsaved } = useRequestPlaygroundStore();
  // const { mutateAsync, data, isPending, isError } = useSuggestRequestName();
  const tab = tabs.find((t) => t.id === tabId);
  const [name, setName] = useState(tab?.title || "");

  useEffect(() => {
    if (tab) setName(tab.title);
  }, [tabId]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    try {
      updateTab(tabId, { title: name });
      markUnsaved(tabId, true);
      toast.success("Request name updated");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update request name");
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return <Modal
    title="Rename Request"
    description="Give your request a name"
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSubmit={handleSubmit}
    submitText="Save"
    submitVariant="default"
  >
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <Input
          placeholder="Request Name..."
          className="w-full p-2 border rounded bg-zinc-900 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
    </div>
  </Modal>
};

export default AddNameModel;
