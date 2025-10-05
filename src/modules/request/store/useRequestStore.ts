import { create } from "zustand";
import { nanoid } from "nanoid";

interface SavedRequest {
    id: string;
    name: string;
    method: string;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
}

export type RequestTab = {
    id: string;
    title: string;
    method: string;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
    unsavedChanges?: boolean;
    requestId?: string;
    collectionId?: string;
    workspaceId?: string;
};

type HeadersMap = Record<string, string>;

interface RequestRun {
    id: string;
    requestId?: string;
    status?: number;
    statusText?: string;
    headers?: HeadersMap;
    body?: string | object | null;
    durationMs?: number;
    createdAt?: string;
}

interface Result {
    status?: number;
    statusText?: string;
    duration?: number;
    size?: number;
}

export interface ResponseData {
    success: boolean;
    requestRun: RequestRun;
    result?: Result;
}

type PlaygroundState = {
    tabs: RequestTab[];
    activeTabId: string | null;
    addTab: () => void;
    closeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    updateTab: (id: string, data: Partial<RequestTab>) => void;
    markUnsaved: (id: string, value: boolean) => void;
    openRequestTab: (req: any) => void;
    updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest) => void;
    responseViewerData: ResponseData | null;
    setResponseViewerData: (data: ResponseData) => void
};

interface SetFunction<T> {
    (fn: (state: T) => Partial<T> | T): void;
    (partial: Partial<T>): void;
}

interface OpenRequestTabArg {
    id: string;
    name?: string;
    method: string;
    url: string;
    body?: string;
    headers?: string;
    parameters?: string;
    collectionId?: string;
    workspaceId?: string;
}

export const useRequestPlaygroundStore = create<PlaygroundState>((set: SetFunction<PlaygroundState>) => ({
    responseViewerData: null,
    setResponseViewerData: (data: ResponseData ) => set({ responseViewerData: data }),
    tabs: [
        {   
            id: nanoid(),
            title: "Request",
            method: "GET",
            url: "https://echo.hoppscotch.io",
            unsavedChanges: false,
        },
    ],
    activeTabId: null,

    addTab: (): void => {
        set((state: PlaygroundState) => {
            const newTab: RequestTab = {
                id: nanoid(),
                title: "Untitled",
                method: "GET",
                url: "",
                body: "",
                headers: "",
                parameters: "",
                unsavedChanges: true,
            };
            return {
                tabs: [...state.tabs, newTab],
                activeTabId: newTab.id,
            };
        });
    },

    closeTab: (id: string): void =>
        set((state: PlaygroundState) => {
            const newTabs = state.tabs.filter((t) => t.id !== id);
            const newActive =
                state.activeTabId === id && newTabs.length > 0
                    ? newTabs[0].id
                    : state.activeTabId;
            return { tabs: newTabs, activeTabId: newActive };
        }),
    setActiveTab: (id: string): void => set({ activeTabId: id }),
    updateTab: (id: string, data: Partial<RequestTab>): void =>
        set((state: PlaygroundState) => ({
            tabs: state.tabs.map((t) =>
                t.id === id ? { ...t, ...data, unsavedChanges: true } : t
            ),
        })),

    openRequestTab: (req: OpenRequestTabArg): void =>
        set((state: PlaygroundState) => {
            const existing = state.tabs.find((t) => t.requestId === req.id);
            if (existing) {
                return { activeTabId: existing.id };
            }
            const newTab: RequestTab = {
                id: nanoid(),
                title: req.name || "Untitled",
                method: req.method,
                url: req.url,
                body: req.body,
                headers: req.headers,
                parameters: req.parameters,
                requestId: req.id,
                collectionId: req.collectionId,
                workspaceId: req.workspaceId,
                unsavedChanges: false,
            };
            return {
                tabs: [...state.tabs, newTab],
                activeTabId: newTab.id,
            };
        }),
    markUnsaved: (id: string, value: boolean): void =>
        set((state: PlaygroundState) => ({
            tabs: state.tabs.map((t) =>
                t.id === id ? { ...t, unsavedChanges: value } : t)
        })),

    updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest): void =>
        set((state: PlaygroundState) => ({
            tabs: state.tabs.map((t) =>
                t.id === tabId ? {
                    ...t, id: savedRequest.id, //  Replace temporary id with saved one
                    title: savedRequest.name,
                    method: savedRequest.method,
                    body: savedRequest?.body,
                    headers: savedRequest?.headers,
                    parameters: savedRequest?.parameters,
                    url: savedRequest.url,
                    unsavedChanges: false,
                } : t),
            activeTabId: savedRequest.id, //  keep active in sync
        })),

}));
