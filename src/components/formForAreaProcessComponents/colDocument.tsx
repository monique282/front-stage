import React from 'react';
import { Form, Button,  Col, Badge } from 'react-bootstrap';
import { addDocument } from './addDocument';
import { removeDocument } from './removeDocument';
import { ProcessFormData } from '../../types/processFormData';

interface ColDocumentProps {
    tempDocument: string;
    setTempDocument: React.Dispatch<React.SetStateAction<string>>;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
};

export default function ColDocument({ tempDocument, setTempDocument, processForm, setProcessForm }: ColDocumentProps) {
    
    return (
        <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Documentação</Form.Label>
                <div className="d-flex mb-2">
                    <Form.Control
                        type="text"
                        value={tempDocument}
                        onChange={(e) => setTempDocument(e.target.value)}
                        placeholder="Adicionar documento"
                    />
                    <Button variant="outline-primary" onClick={() => addDocument({ tempDocument, processForm, setProcessForm, setTempDocument })} className="ms-2">
                        +
                    </Button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {processForm.documents.map(document => (
                        <Badge key={document} bg="warning" text="dark" className="d-flex align-items-center">
                            {document}
                            <span
                                className="ms-1"
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeDocument({ document, setProcessForm, processForm })}
                            >
                                ×
                            </span>
                        </Badge>
                    ))}
                </div>
            </Form.Group>
        </Col>
    );
}