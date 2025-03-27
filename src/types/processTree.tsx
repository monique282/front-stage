
 export type Process = {
    id: string;
    name: string;
    description: string;
    areaId: number;
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

export type AreaPut = {
    id: number;
    name: string;
    description: string;
}