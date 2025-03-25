
 export type Process = {
    id: string;
    name: string;
    description: string;
    areaId: number;
    parentId: string | null;
    tools: string[];
    responsible: string[];
    documents: string[];
    createdById: number;
    createdAt: string;
    updatedAt: string;
}

export type Area ={
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    processes: Process[];
}