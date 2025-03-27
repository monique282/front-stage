import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { ProcessPut } from '../../../types/processFormData';


interface FormProcessProps {
    process: ProcessPut;
    setEditedProcess: React.Dispatch<React.SetStateAction<ProcessPut>>;
}

export function FieldDocuments({ process,  setEditedProcess }: FormProcessProps) {
    const [newDocument, setNewDocument] = useState('');

    const addDocument = () => {
        if (newDocument.trim() && !process.documents?.includes(newDocument.trim())) {
            setEditedProcess({
                ...process,
                documents: [...(process.documents || []), newDocument.trim()]
            });
            setNewDocument('');
        }
    };

    const removeDocument = (documentToRemove: string) => {
        setEditedProcess({
            ...process,
            documents: process.documents?.filter(doc => doc !== documentToRemove) || []
        });
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>Documentação</Form.Label>
            <div className="d-flex mb-2">
                <Form.Control
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Adicionar documento"
                />
                <Button variant="outline-secondary" onClick={addDocument} className="ms-2">
                    Adicionar
                </Button>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {process.documents?.map((doc, index) => (
                    <Badge key={index} bg="secondary" className="d-flex align-items-center">
                        {doc}
                        <Button
                            variant="link"
                            className="text-white p-0 ms-2"
                            onClick={() => removeDocument(doc)}
                            size="sm"
                        >
                            ×
                        </Button>
                    </Badge>
                ))}
            </div>
        </Form.Group>
    );
};