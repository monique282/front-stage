import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { ProcessPut } from '../../../types/processFormData';


interface FormProcessProps {
    process: ProcessPut;
    setEditedProcess: React.Dispatch<React.SetStateAction<ProcessPut>>;
}

export function FieldResponsibles({ process, setEditedProcess }: FormProcessProps) {
    const [newResponsible, setNewResponsible] = useState('');

    const addResponsible = () => {
        if (newResponsible.trim() && !process.responsible?.includes(newResponsible.trim())) {
            setEditedProcess({
                ...process,
                responsible: [...(process.responsible || []), newResponsible.trim()]
            });
            setNewResponsible('');
        }
    };

    const removeResponsible = (responsibleToRemove: string) => {
        setEditedProcess({
            ...process,
            responsible: process.responsible?.filter(resp => resp !== responsibleToRemove) || []
        });
    };


    return (
        <Form.Group className="mb-3">
            <Form.Label>Responsáveis</Form.Label>
            <div className="d-flex mb-2">
                <Form.Control
                    type="text"
                    value={newResponsible}
                    onChange={(e) => setNewResponsible(e.target.value)}
                    placeholder="Adicionar responsável"
                />
                <Button variant="outline-secondary" onClick={addResponsible} className="ms-2">
                    Adicionar
                </Button>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {process.responsible?.map((resp, index) => (
                    <Badge key={index} bg="primary" className="d-flex align-items-center">
                        {resp}
                        <Button
                            variant="link"
                            className="text-white p-0 ms-2"
                            onClick={() => removeResponsible(resp)}
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