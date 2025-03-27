export interface ProcessFormData {
    name: string;
    description: string;
    areaId: number;
    tools: string[];
    responsible: string[];
    documents: string[];
};

export interface ProcessPut {
    name: string;
    description: string;
    tools?: string[];
    responsible?: string[];
    documents?: string[];
}