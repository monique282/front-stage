import React, { useContext } from 'react';
import { Accordion, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import { NavigateFunction } from 'react-router-dom';
import { AuthContext } from '../../../contexts/contex';
import { Area, AreaPut } from '../../../types/processTree';

interface DivAccordionProps {
    onDeleteArea?: (areaId: number, authToken: string) => void;
    areas: Area[];
    setEditedArea: React.Dispatch<React.SetStateAction<Partial<AreaPut>>>;
    setEditingAreaId: React.Dispatch<React.SetStateAction<number | null>>;
    area: Area;
    onEditArea?: (areaId: number, editedArea: Partial<AreaPut>, authToken: string, navigate: NavigateFunction) => void;
}


export function DivAccordion({ onDeleteArea, areas, setEditedArea, setEditingAreaId, area, onEditArea }: DivAccordionProps) {
    const { admin, authToken } = useContext(AuthContext) as { admin: boolean; authToken: string; };

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

    return (
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

    );
};