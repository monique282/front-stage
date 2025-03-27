import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { ProcessPut } from '../../../types/processFormData';
import { FieldDocuments } from '../formProcees/fieldDocuments';
import { FieldForTools } from '../formProcees/fieldForTools';
import { FieldResponsibles } from '../formProcees/fieldResponsibles';

interface FormProcessProps {
    process: ProcessPut;
    onSave: (editedProcess: ProcessPut) => void;
    onCancel: () => void;
    setEditedProcess: React.Dispatch<React.SetStateAction<ProcessPut>>;
}

export function FormProcessEdit({ process, onSave, onCancel, setEditedProcess }: FormProcessProps) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(process);
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
            <FieldResponsibles process={process} setEditedProcess={setEditedProcess} />
            <FieldDocuments process={process} setEditedProcess={setEditedProcess} />

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