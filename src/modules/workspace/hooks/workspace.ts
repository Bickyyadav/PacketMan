import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkspace, getWorkspaceById, getWorkspaces, initializeWorkspace } from "../actions";

export function useWorkspaces() {
    return useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            try {
                const result = await getWorkspaces();
                return result;
            } catch (error) {
                console.error("🚀 ~ useWorkspaces ~ error:", error);
                throw error;
            }
        },
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })
}

export function useCreateWorkspaces() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (name: string) => createWorkspace(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
    });
}

export function useGetWorkspace(id: string) {
    return useQuery({
        queryKey: ["workspace", id],
        queryFn: async () => getWorkspaceById(id),
    });
}

export function useInitializeWorkspace() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => initializeWorkspace(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
    });
}

