import { Button, Col, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { NavigateFunction } from 'react-router-dom';

interface RowFormforAreaProcessProps {
    setShowAreaModal: (value: boolean) => void;
    setShowProcessModal: (value: boolean) => void;
    navigate: NavigateFunction;
}

export function RowFormforArea({ setShowAreaModal, setShowProcessModal, navigate }: RowFormforAreaProcessProps) {
    return (
        <Row className="mb-4">
            <Col>
                <Button variant="primary" onClick={() => setShowAreaModal(true)} className="me-2">
                    <FaPlus className="me-2" /> Nova Área
                </Button>
                <Button variant="success" onClick={() => setShowProcessModal(true)}>
                    <FaPlus className="me-2" /> Novo Processo
                </Button>
            </Col>
            <Button variant="primary" onClick={() => navigate("/")} className="me-2 mt-5">
                Voltar
            </Button>
        </Row>
    )
}