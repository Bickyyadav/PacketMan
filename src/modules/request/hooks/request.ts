import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addRequestToCollection,
    type Request,
    getAllRequestFromCollection,
    saveRequest,
    run,
} from "../actions";
import { useRequestPlaygroundStore } from "../store/useRequestStore";
// import { useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
    const queryClient = useQueryClient();
    // const { updateTabFromSavedRequest, activeTabId } = useRequestPlaygroundStore();
    return useMutation({
        mutationFn: async (value: Request) =>
            addRequestToCollection(collectionId, value),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });
            // updateTabFromSavedRequest(activeTabId!, data);
        },
    });
}

export function useGetAllRequestFromCollection(collectionId: string) {
    return useQuery({
        queryKey: ["requests", collectionId],
        queryFn: async () => getAllRequestFromCollection(collectionId),
    });
}

export function useSaveRequest(id: string) {
    const { updateTabFromSavedRequest, activeTabId } =
        useRequestPlaygroundStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (value: Request) => saveRequest(id, value),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            updateTabFromSavedRequest(activeTabId!, data);
        },
    });
}

export function useRunRequest(requestId: string) {
    const { setResponseViewerData } = useRequestPlaygroundStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => await run(requestId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            setResponseViewerData(data);
        },
    });
}
