import React from 'react';
import { Form, Button, Col, Badge } from 'react-bootstrap';
import { addResponsible } from './addResponsible';
import { removeResponsible } from './removeResponsible';
import { ProcessFormData } from '../../types/processFormData';

interface ColResponsibleProps {
    tempResponsible: string;
    setTempResponsible: React.Dispatch<React.SetStateAction<string>>;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
}

export default function ColResponsible({ tempResponsible, setTempResponsible, processForm, setProcessForm }: ColResponsibleProps) {

    return (
        <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Responsáveis</Form.Label>
                <div className="d-flex mb-2">
                    <Form.Control
                        type="text"
                        value={tempResponsible}
                        onChange={(e) => setTempResponsible(e.target.value)}
                        placeholder="Adicionar responsável"
                    />
                    <Button variant="outline-primary" onClick={() => addResponsible({ tempResponsible, processForm, setProcessForm, setTempResponsible })} className="ms-2">
                        +
                    </Button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {processForm.responsible.map(responsible => (
                        <Badge key={responsible} bg="info" className="d-flex align-items-center">
                            {responsible}
                            <Button
                                variant="link"
                                size="sm"
                                className="text-white p-0 ms-1"
                                onClick={() => removeResponsible({ responsible, setProcessForm, processForm })}
                            >
                                ×
                            </Button>
                        </Badge>
                    ))}
                </div>
            </Form.Group>
        </Col>


    );
}