import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { ProcessPut } from '../../../types/processFormData';

interface FormProcessProps {
    process: ProcessPut;
    setEditedProcess: React.Dispatch<React.SetStateAction<ProcessPut>>;
}

export function FieldForTools({ process, setEditedProcess }: FormProcessProps) {
    const [newTool, setNewTool] = useState('');

    const addTool = () => {
        if (newTool.trim() && !process.tools?.includes(newTool.trim())) {
            setEditedProcess({
                ...process,
                tools: [...(process.tools || []), newTool.trim()]
            });
            setNewTool('');
        }
    };

    const removeTool = (toolToRemove: string) => {
        setEditedProcess({
            ...process,
            tools: process.tools?.filter(tool => tool !== toolToRemove) || []
        });
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>Ferramentas</Form.Label>
            <div className="d-flex mb-2">
                <Form.Control
                    type="text"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="Adicionar ferramenta"
                />
                <Button variant="outline-secondary" onClick={addTool} className="ms-2">
                    Adicionar
                </Button>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {process.tools?.map((tool, index) => (
                    <Badge key={index} bg="info" className="d-flex align-items-center">
                        {tool}
                        <Button
                            variant="link"
                            className="text-white p-0 ms-2"
                            onClick={() => removeTool(tool)}
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