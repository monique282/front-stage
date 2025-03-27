import React from 'react';
import { ProcessFormData } from '../../types/processFormData';

interface RemoveResponsibleProps {
    responsible: string;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
}

export function removeResponsible({ responsible, setProcessForm, processForm }: RemoveResponsibleProps): void {
    setProcessForm({
        ...processForm,
        responsible: processForm.responsible.filter(r => r !== responsible)
    });
};