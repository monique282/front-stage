import React, { useContext, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Area, AreaPut, Process } from '../../types/processTree';
import { AuthContext } from '../../contexts/contex';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ListGroupProcess } from './listGroup';
import { DivAccordion } from './divAccordion';
import { FormProcess } from './form';
import { CardHeader } from './cardHerder';
import { ProcessPut } from '../../types/processFormData';

interface ProcessTreeViewProps {
    areas: Area[];
    onDeleteProcess?: (processId: string, authToken: string) => void;
    onDeleteArea?: (areaId: number, authToken: string) => void;
    onEditArea?: (areaId: number, editedArea: Partial<AreaPut>, authToken: string, navigate: NavigateFunction) => void;
    onEditProcess?: (processId: string, editedProcess: ProcessPut, authToken: string) => void;
}

export function ProcessTreeView({ areas, onDeleteProcess, onDeleteArea, onEditArea, onEditProcess }: ProcessTreeViewProps) {
    const { admin, authToken } = useContext(AuthContext) as { admin: boolean; authToken: string; };
    const [editingAreaId, setEditingAreaId] = useState<number | null>(null);
    const [editedArea, setEditedArea] = useState<Partial<AreaPut>>({});
    const navigate = useNavigate();

    const renderProcess = (process: Process) => {
        return (
            <div key={process.id} className="mb-2">
                <Card className="mb-2">
                    <CardHeader admin={admin} process={process} onDeleteProcess={onDeleteProcess} onEditProcess={onEditProcess}  authToken={authToken} />
                    <Card.Body>
                        <p>{process.description}</p>
                        <ListGroupProcess process={process} />
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
                        <DivAccordion onDeleteArea={onDeleteArea} areas={areas} setEditedArea={setEditedArea} setEditingAreaId={setEditingAreaId} area={area} onEditArea={onEditArea} />
                        <Accordion.Body>
                            {editingAreaId === area.id ? (
                                <FormProcess editingAreaId={editingAreaId} onEditArea={onEditArea} editedArea={editedArea} setEditingAreaId={setEditingAreaId} setEditedArea={setEditedArea} navigate={navigate} />
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