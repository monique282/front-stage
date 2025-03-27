import React from 'react';
import { ProcessFormData } from '../../types/processFormData';


interface AddDocumentProps {
    tempDocument: string;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
    setTempDocument: React.Dispatch<React.SetStateAction<string>>;
}

export function addDocument({ tempDocument, processForm, setProcessForm, setTempDocument }: AddDocumentProps): void {
    if (tempDocument && !processForm.documents.includes(tempDocument)) {
        setProcessForm({
            ...processForm,
            documents: [...processForm.documents, tempDocument]
        });
        setTempDocument('');
    }
};