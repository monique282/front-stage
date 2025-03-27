import React from 'react';
import { ProcessFormData } from '../../types/processFormData';

interface AddResponsibleProps {
    tempResponsible: string;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
    setTempResponsible: React.Dispatch<React.SetStateAction<string>>;
}

export function addResponsible({ tempResponsible, processForm, setProcessForm, setTempResponsible }: AddResponsibleProps): void {
    if (tempResponsible && !processForm.responsible.includes(tempResponsible)) {
        setProcessForm({
            ...processForm,
            responsible: [...processForm.responsible, tempResponsible]
        });
        setTempResponsible('');
    }
};