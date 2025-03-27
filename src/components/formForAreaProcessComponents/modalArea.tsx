
import React from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

interface ModalAreaProps {
    showAreaModal: boolean;
    setShowAreaModal: (value: boolean) => void;
    handleAreaSubmit: (e: React.FormEvent) => void;
    error: string;
    success: string;
    areaForm: {
        name: string;
        description: string;
    };
    setAreaForm: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
    }>>;
}

export function ModalArea({ showAreaModal, setShowAreaModal, handleAreaSubmit, error, success, areaForm, setAreaForm }: ModalAreaProps){

    return(
        <Modal show={showAreaModal} onHide={() => setShowAreaModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Nova Área</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAreaSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Nome da Área *</Form.Label>
                        <Form.Control
                            type="text"
                            value={areaForm.name}
                            onChange={(e) => setAreaForm({ ...areaForm, name: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={areaForm.description}
                            onChange={(e) => setAreaForm({ ...areaForm, description: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowAreaModal(false); setAreaForm({ name: '', description: '' }); }}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        <FaSave className="me-2" /> Salvar Área
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}