import React from 'react';
import { ProcessFormData } from '../../types/processFormData';

interface RemoveDocumentProps {
    document: string;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
}

export function removeDocument({ document, setProcessForm, processForm }: RemoveDocumentProps): void {
    setProcessForm({
        ...processForm,
        documents: processForm.documents.filter(d => d !== document)
    });
};
