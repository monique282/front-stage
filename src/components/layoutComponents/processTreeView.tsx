import React from 'react';
import { Accordion, Card, Badge, ListGroup } from 'react-bootstrap';
import { FaUsers, FaTools, FaFileAlt, FaUserTie } from 'react-icons/fa';
import { Area, Process } from '../../types/processTree';


interface ProcessTreeViewProps {
    areas: Area[];
}

const ProcessTreeView: React.FC<ProcessTreeViewProps> = ({ areas }) => {
    const getSubprocesses = (processId: string): Process[] => {
        return areas.flatMap(area =>
            area.processes.filter(process => process.parentId === processId)
        );
    };

    const renderProcess = (process: Process, areaId: number, level = 0) => {
        const subprocesses = getSubprocesses(process.id);

        return (
            <div key={process.id} className={`mb-2 ps-${level * 3}`} style={{ marginLeft: `${level * 20}px` }}>
                <Card className="mb-2" >
                    <Card.Header>
                        <h5 className="mb-0" >
                            {process.name}
                            < Badge bg="secondary" className="ms-2" >
                                {subprocesses.length > 0 ? `${subprocesses.length} subprocessos` : 'Processo final'}
                            </Badge>
                        </h5>
                    </Card.Header>
                    < Card.Body >
                        <p>{process.description} </p>
                        < ListGroup variant="flush" >
                            {
                                process.tools?.length > 0 && (
                                    <ListGroup.Item>
                                        <FaTools className="me-2" />
                                        < strong > Ferramentas:</strong> {process.tools.join(', ')}
                                    </ListGroup.Item>
                                )}
                            {
                                process.responsible?.length > 0 && (
                                    <ListGroup.Item>
                                        <FaUserTie className="me-2" />
                                        <strong>Responsáveis: </strong> {process.responsible.join(', ')}
                                    </ListGroup.Item>
                                )
                            }
                            {
                                process.documents?.length > 0 && (
                                    <ListGroup.Item>
                                        <FaFileAlt className="me-2" />
                                        <strong>Documentação: </strong> {process.documents.join(', ')}
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>

                {
                    subprocesses.length > 0 && (
                        <div className="subprocesses" >
                            {subprocesses.map(subprocess => renderProcess(subprocess, areaId, level + 1))}
                        </div>
                    )
                }
            </div>
        );
    };

    return (
        <div className="process-tree-view" >
            <h2 className="mb-4" > Mapeamento de Processos por Área </h2>
            < Accordion defaultActiveKey="0" >
                {
                    areas.map((area, index) => {
                        const topLevelProcesses = area.processes.filter(process => process.parentId === null);
                        return (
                            <Accordion.Item eventKey={String(index)} key={area.id} >
                                <Accordion.Header>
                                    <FaUsers className="me-2" />
                                    {area.name}
                                    < Badge bg="info" className="ms-2" >
                                        {topLevelProcesses.length} processos principais
                                    </Badge>
                                </Accordion.Header>
                                < Accordion.Body >
                                    <p className="text-muted" > {area.description} </p>
                                    {
                                        topLevelProcesses.length > 0 ? (
                                            topLevelProcesses.map(process => renderProcess(process, area.id))
                                        ) : (
                                            <div className="text-center py-3" >
                                                <p>Nenhum processo cadastrado para esta área.</p>
                                            </div>
                                        )
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
            </Accordion>
        </div>
    );
};

export default ProcessTreeView;