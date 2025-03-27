import React, { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { ProcessPut } from '../../types/processFormData';
import { FieldForTools } from './formProcees/fieldForTools';

interface FormProcessProps {
    process: ProcessPut;
    onSave: (editedProcess: ProcessPut) => void;
    onCancel: () => void;
    setEditedProcess: React.Dispatch<React.SetStateAction<ProcessPut>>;
}

export function FormProcessEdit({ process, onSave, onCancel, setEditedProcess }: FormProcessProps) {
    const [newTool, setNewTool] = useState('');
    const [newResponsible, setNewResponsible] = useState('');
    const [newDocument, setNewDocument] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(process);
    };

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
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nome do Processo</Form.Label>
                <Form.Control
                    type="text"
                    value={process.name}
                    onChange={(e) => setEditedProcess({ ...process, name: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={process.description}
                    onChange={(e) => setEditedProcess({ ...process, description: e.target.value })}
                />
            </Form.Group>
            
            <FieldForTools process={process} setEditedProcess={setEditedProcess} />

            {/* Campo para Responsáveis */}
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

            {/* Campo para Documentação */}
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

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </div>
        </Form>
    );
};