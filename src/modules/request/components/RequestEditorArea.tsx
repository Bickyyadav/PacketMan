import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tabs } from "@radix-ui/react-tabs"
import KeyValueFormEditor from "./KeyValueFormEditor"
import { RequestTab } from "../store/useRequestStore"
import { toast } from "sonner"


interface Props {
    tab: RequestTab
    updateTab: (id: string, data: Partial<RequestTab>) => void
}



const RequestEditorArea = ({ tab, updateTab }: Props) => {

    const parseKeyValueData = (jsonString?: string) => {
        if (!jsonString) return []
        try {
            return JSON.parse(jsonString)
        } catch (error) {
            console.log("🚀 ~ parseKeyValueData ~ error:", error)
        }
    }

    const getHeadersData = () => {
        const parsed = parseKeyValueData(tab.headers);
        return parsed.length > 0 ? parsed : [{ key: "", value: "", enabled: true }];
    };

    const getParametersData = () => {
        const parsed = parseKeyValueData(tab.parameters);
        return parsed.length > 0 ? parsed : [{ key: "", value: "", enabled: true }];
    };

    const getBodyData = () => {
        return {
            contentType: 'application/json' as const,
            body: tab.body || ''
        };
    };

    const handleHeadersChange = (data: { key: string; value: string; enabled?: boolean }[]) => {

        const filteredHeaders = data.filter((item) =>
            item.enabled !== false && (item.key.trim() || item.value.trim())
        );
        updateTab(tab.id, { headers: JSON.stringify(filteredHeaders) });
        toast.success("Headers updated successfully")
    };

    const handleParametersChange = (data: { key: string; value: string; enabled?: boolean }[]) => {

        const filteredParams = data.filter((item) =>
            item.enabled !== false && (item.key.trim() || item.value.trim())
        );
        updateTab(tab.id, { parameters: JSON.stringify(filteredParams) });
        toast.success("Parameters updated successfully")
    };

    const handleBodyChange = (data: { contentType: string; body?: string }) => {
        updateTab(tab.id, { body: data.body || '' });
        toast.success("Body updated successfully")
    };


    return (
        <Tabs className="bg-zinc-800 rounded-md w-full px-4 py-4" defaultValue="parameters">
            <TabsList className="bg-zinc-800 rounded-t-md">
                <TabsTrigger value="parameters" className="flex-1">
                    Parameters
                </TabsTrigger>
                <TabsTrigger value="headers" className="flex-1">
                    Headers
                </TabsTrigger>
                <TabsTrigger value="body" className="flex-1">
                    Body
                </TabsTrigger>
            </TabsList>

            <TabsContent value="parameters" >
                <KeyValueFormEditor initialData={getParametersData()} onSubmit={() => { handleParametersChange }} placeholder={{
                    key: "Parameter Name",
                    value: "Parameter Value",
                    description: "URL Parameter"
                }} />
            </TabsContent>
            <TabsContent value="headers" >
                <KeyValueFormEditor initialData={getHeadersData()} onSubmit={() => { handleHeadersChange }} placeholder={{
                    key: "Parameter Name",
                    value: "Parameter Value",
                    description: "URL Parameter"
                }} />
            </TabsContent>
            <TabsContent value="body" >
                {/* <KeyValueFormEditor initialData={getBodyData()} onSubmit={() => { handleBodyChange }} /> */}

            </TabsContent>

        </Tabs>
    )
}

export default RequestEditorArea
