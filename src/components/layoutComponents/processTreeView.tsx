import React, { useContext, useState } from 'react';
import { Accordion, Card, Badge, ListGroup, Button } from 'react-bootstrap';
import { FaUsers, FaTools, FaFileAlt, FaUserTie, FaTrash, FaEdit } from 'react-icons/fa';
import { Area, AreaPut, Process } from '../../types/processTree';
import { AuthContext } from '../../contexts/contex';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ProcessTreeViewProps {
    areas: Area[];
    onDeleteProcess?: (processId: string, authToken: string) => void;
    onDeleteArea?: (areaId: number, authToken: string) => void;
    onEditArea?: (areaId: number, editedArea: Partial<AreaPut>, authToken: string, navigate: NavigateFunction) => void;
}

export function ProcessTreeView({ areas, onDeleteProcess, onDeleteArea, onEditArea }: ProcessTreeViewProps) {
    const { admin, authToken } = useContext(AuthContext) as { admin: boolean; authToken: string; };
    const [editingAreaId, setEditingAreaId] = useState<number | null>(null);
    const [editedArea, setEditedArea] = useState<Partial<AreaPut>>({});
    const navigate = useNavigate();

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

    function handleEditArea(areaId: number, e: React.MouseEvent) {
        e.stopPropagation();
        const areaToEdit = areas.find(area => area.id === areaId);
        if (areaToEdit) {
            setEditedArea({
                name: areaToEdit.name,
                description: areaToEdit.description
            });
            setEditingAreaId(areaId);
        }
    };

    const handleSaveArea = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (editingAreaId !== null && onEditArea) {
            onEditArea(editingAreaId, {
                name: editedArea.name,
                description: editedArea.description
            }, authToken, navigate);
            setEditingAreaId(null);
            setEditedArea({});
        }
    };

    const handleCancelEditArea = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingAreaId(null);
        setEditedArea({});
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
                        {admin && (
                            <div>
                                {onDeleteProcess && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={(e) => handleDeleteProcess(process.id, e)}
                                        title="Excluir processo"
                                    >
                                        <FaTrash />
                                    </Button>
                                )}
                            </div>
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
                        <div className="d-flex align-items-center">
                            <Accordion.Header className="flex-grow-1">
                                <div className="d-flex align-items-center">
                                    <FaUsers className="me-2" />
                                    {area.name}
                                    <Badge bg="info" className="ms-2">
                                        {area.processes.length} processos
                                    </Badge>
                                </div>
                            </Accordion.Header>
                            {admin && (
                                <div className="d-flex align-items-center pe-3">
                                    {onEditArea && (
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={(e) => handleEditArea(area.id, e)}
                                            title="Editar área"
                                        >
                                            <FaEdit />
                                        </Button>
                                    )}
                                    {onDeleteArea && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={(e) => handleDeleteArea(area.id, e)}
                                            title="Excluir área"
                                        >
                                            <FaTrash />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                        <Accordion.Body>
                            {editingAreaId === area.id ? (
                                <form onSubmit={handleSaveArea}>
                                    <div className="mb-3">
                                        <label htmlFor="areaName" className="form-label">Nome da Área</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="areaName"
                                            value={editedArea.name || ''}
                                            onChange={(e) => setEditedArea({ ...editedArea, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="areaDescription" className="form-label">Descrição</label>
                                        <textarea
                                            className="form-control"
                                            id="areaDescription"
                                            rows={3}
                                            value={editedArea.description || ''}
                                            onChange={(e) => setEditedArea({ ...editedArea, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="secondary" size="sm" onClick={handleCancelEditArea}>
                                            Cancelar
                                        </Button>
                                        <Button variant="primary" size="sm" type="submit">
                                            Salvar
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p className="text-muted">{area.description}</p>

                                    {area.processes.length > 0 ? (
                                        area.processes.map(process => renderProcess(process))
                                    ) : (
                                        <div className="text-center py-3">
                                            <p>Nenhum processo cadastrado para esta área.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};