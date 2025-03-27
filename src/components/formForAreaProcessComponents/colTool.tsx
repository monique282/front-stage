import React from 'react';
import { Form, Button, Col, Badge } from 'react-bootstrap';
import { addTool } from './addTool';
import { removeTool } from './removeTool';
import { ProcessFormData } from '../../types/processFormData';


interface ColToolProps {
    tempTool: string;
    setTempTool: React.Dispatch<React.SetStateAction<string>>;
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
}

export default function ColTool({ tempTool, setTempTool, processForm, setProcessForm }: ColToolProps) {
    
    return (
        <Col md={4}>
            <Form.Group className="mb-3">
                <Form.Label>Ferramentas</Form.Label>
                <div className="d-flex mb-2">
                    <Form.Control
                        type="text"
                        value={tempTool}
                        onChange={(e) => setTempTool(e.target.value)}
                        placeholder="Adicionar ferramenta"
                    />
                    <Button variant="outline-primary" onClick={() => addTool({ tempTool, processForm, setProcessForm, setTempTool })} className="ms-2">
                        +
                    </Button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {processForm.tools.map(tool => (
                        <Badge key={tool} bg="secondary" className="d-flex align-items-center">
                            {tool}
                            <Button
                                variant="link"
                                size="sm"
                                className="text-white p-0 ms-1"
                                onClick={() => removeTool({ tool, processForm, setProcessForm })}
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