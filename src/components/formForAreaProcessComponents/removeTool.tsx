import React from 'react';
import { ProcessFormData } from '../../types/processFormData';

interface RemoveToolProps {
    tool: string;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
    processForm: ProcessFormData;
}

export function removeTool({ tool, processForm, setProcessForm }: RemoveToolProps): void  {
    setProcessForm({
        ...processForm,
        tools: processForm.tools.filter(t => t !== tool)
    });
};
