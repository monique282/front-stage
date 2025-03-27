import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RowFormforArea } from '../components/formForAreaProcessComponents/rowFormforArea';
import { ModalArea } from '../components/formForAreaProcessComponents/modalArea';
import { AuthContext } from '../contexts/contex';
import { handleAreaSubmit } from '../components/formForAreaProcessComponents/handleAreaSubmit';
import axios from 'axios';
import { RowFormForProcess } from '../components/formForAreaProcessComponents/rowFormForProcess';
import ColTool from '../components/formForAreaProcessComponents/colTool';
import ColDocument from '../components/formForAreaProcessComponents/colDocument';
import { handleProcessSubmit } from '../components/formForAreaProcessComponents/handleProcessSubmit';
import ColResponsible from '../components/formForAreaProcessComponents/colResponsible';

export default function FormForArea() {
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [showProcessModal, setShowProcessModal] = useState(false);
    const [areaForm, setAreaForm] = useState({ name: '', description: '' });
    const [processForm, setProcessForm] = useState({
        name: '',
        description: '',
        areaId: 0,
        tools: [],
        responsible: [],
        documents: []
    });
    const [tempTool, setTempTool] = useState('');
    const [tempResponsible, setTempResponsible] = useState('');
    const [tempDocument, setTempDocument] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [areas, setAreas] = useState([]);
    const { authToken } = useContext(AuthContext)


    useEffect(() => {
        const urlCode = `${import.meta.env.VITE_API_URL}/tree/area`;
        axios.get(urlCode)
            .then((response) => {
                setAreas(response.data)
            })
            .catch((err) => {
                console.error('Erro completo:', err);
                console.error('Resposta de erro:', err.response?.data);

            })
    }, [])

    return (
        <div className="container mt-4">
            <Row className="mb-4">
                <Col>
                    <h2>Gerenciamento de Áreas e Processos</h2>
                </Col>
            </Row>

            <RowFormforArea setShowAreaModal={setShowAreaModal} setShowProcessModal={setShowProcessModal} navigate={navigate} />
            <ModalArea showAreaModal={showAreaModal} setShowAreaModal={setShowAreaModal} handleAreaSubmit={(e) => handleAreaSubmit({
                e,setError,setSuccess,setAreaForm,setShowAreaModal,authToken,areaForm})} eror={error} success={success} areaForm={areaForm} setAreaForm={setAreaForm} />

            <Modal show={showProcessModal} onHide={() => setShowProcessModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Criar Novo Processo</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleProcessSubmit({ e, setError,setSuccess, setProcessForm, setShowProcessModal, authToken, processForm
                })}>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <RowFormForProcess processForm={processForm} setProcessForm={setProcessForm} areas={areas} />
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={processForm.description}
                                onChange={(e) => setProcessForm({ ...processForm, description: e.target.value })}
                            />
                        </Form.Group>

                        <Row>
                            <ColTool tempTool={tempTool} setTempTool={setTempTool} processForm={processForm} setProcessForm={setProcessForm} />
                            <ColResponsible tempResponsible={tempResponsible} setTempResponsible={setTempResponsible} processForm={processForm} setProcessForm={setProcessForm} />

                            <ColDocument tempDocument={tempDocument} setTempDocument={setTempDocument} processForm={processForm} setProcessForm={setProcessForm} />
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProcessModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            <FaSave className="me-2" /> Salvar Processo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}