import React, { useContext, useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Area, AreaPut, Process } from '../../types/processTree';
import { AuthContext } from '../../contexts/contex';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CardHerder } from './cardHerder';
import { ListGroupProcess } from './listGroup';
import { DivAccordion } from './divAccordion';

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
                    <CardHerder admin={admin} process={process} onDeleteProcess={onDeleteProcess} authToken={authToken} />
                    <Card.Body>
                        <p>{process.description}</p>
                        <ListGroupProcess process={process}/>
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
                        <DivAccordion onDeleteArea={onDeleteArea} areas={areas} setEditedArea={setEditedArea} setEditingAreaId={setEditingAreaId} area={area} onEditArea={onEditArea}/>
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