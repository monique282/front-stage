import React from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import { ProcessFormData } from '../../types/processFormData';

interface Area {
    id: number;
    name: string;
    description?: string;
}

interface RowFormForProcessProps {
    processForm: ProcessFormData;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
    areas: Area[];
}
export function RowFormForProcess({ processForm, setProcessForm, areas }: RowFormForProcessProps ){
    return (
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome do Processo *</Form.Label>
                    <Form.Control
                        type="text"
                        value={processForm.name}
                        onChange={(e) => setProcessForm({ ...processForm, name: e.target.value })}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Área *</Form.Label>
                    <Form.Select
                        value={processForm.areaId}
                        onChange={(e) => setProcessForm({ ...processForm, areaId: parseInt(e.target.value) })}
                        required
                    >
                        <option value="">Selecione uma área</option>
                        {areas.map(area => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    )
}