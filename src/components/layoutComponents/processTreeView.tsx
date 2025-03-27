import React, { useContext } from 'react';
import { Accordion, Card, Badge, ListGroup, Button } from 'react-bootstrap';
import { FaUsers, FaTools, FaFileAlt, FaUserTie, FaTrash } from 'react-icons/fa';
import { Area, Process } from '../../types/processTree';
import { AuthContext } from '../../contexts/contex';

interface ProcessTreeViewProps {
    areas: Area[];
    onDeleteProcess?: (processId: string, authToken: string) => void;
    onDeleteArea?: (areaId: number, authToken: string) => void;
}

const ProcessTreeView: React.FC<ProcessTreeViewProps> = ({ areas, onDeleteProcess, onDeleteArea }) => {
    const { admin, authToken } = useContext(AuthContext) as { admin: boolean; authToken: string; };

    const handleDeleteProcess = (processId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDeleteProcess) {
            onDeleteProcess(processId, authToken);
        }
    };

    const handleDeleteArea = (areaId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDeleteArea) {
            onDeleteArea(areaId, authToken);
        }
    };

    const renderProcess = (process: Process) => {
        return (
            <div key={process.id} className="mb-2">
                <Card className="mb-2">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {process.name}
                            <Badge bg="secondary" className="ms-2">
                                Processo
                            </Badge>
                        </h5>
                        {admin && onDeleteProcess && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={(e) => handleDeleteProcess(process.id, e)}
                                title="Excluir processo"
                            >
                                <FaTrash />
                            </Button>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <p>{process.description}</p>

                        <ListGroup variant="flush">
                            {process.tools?.length > 0 && (
                                <ListGroup.Item>
                                    <FaTools className="me-2" />
                                    <strong>Ferramentas:</strong> {process.tools.join(', ')}
                                </ListGroup.Item>
                            )}

                            {process.responsible?.length > 0 && (
                                <ListGroup.Item>
                                    <FaUserTie className="me-2" />
                                    <strong>Responsáveis:</strong> {process.responsible.join(', ')}
                                </ListGroup.Item>
                            )}

                            {process.documents?.length > 0 && (
                                <ListGroup.Item>
                                    <FaFileAlt className="me-2" />
                                    <strong>Documentação:</strong> {process.documents.join(', ')}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    };

    return (
        <div className="process-tree-view">
            <h2 className="mb-4">Mapeamento de Processos por Área</h2>

            <Accordion defaultActiveKey="0">
                {areas.map((area, index) => (
                    <Accordion.Item eventKey={String(index)} key={area.id}>
                        <Accordion.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <FaUsers className="me-2" />
                                {area.name}
                                <Badge bg="info" className="ms-2">
                                    {area.processes.length} processos
                                </Badge>
                            </div>
                            {admin && onDeleteArea && (
                                <span
                                    className="btn btn-outline-danger btn-sm ms-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteArea(area.id, e);
                                    }}
                                    title="Excluir área"
                                    role="button"
                                >
                                    <FaTrash />
                                </span>
                            )}
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className="text-muted">{area.description}</p>

                            {area.processes.length > 0 ? (
                                area.processes.map(process => renderProcess(process))
                            ) : (
                                <div className="text-center py-3">
                                    <p>Nenhum processo cadastrado para esta área.</p>
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default ProcessTreeView;