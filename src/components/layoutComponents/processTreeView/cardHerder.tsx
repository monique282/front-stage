import React, { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ProcessPut } from '../../../types/processFormData';
import { Process } from '../../../types/processTree';
import { FormProcessEdit } from '../cardHeader/formProcess';

interface CardHeaderProps {
    admin: boolean;
    process: Process;
    onDeleteProcess?: (processId: string, authToken: string) => void;
    onEditProcess?: (processId: string, editedProcess: ProcessPut, authToken: string) => void;
    authToken: string;
}

export function CardHeader({ admin, process, onDeleteProcess, onEditProcess, authToken }: CardHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProcess, setEditedProcess] = useState<ProcessPut>({
        name: process.name,
        description: process.description,
        tools: process.tools ? [...process.tools] : [],
        responsible: process.responsible ? [...process.responsible] : [],
        documents: process.documents ? [...process.documents] : []
    });

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDeleteProcess) {
            onDeleteProcess(process.id, authToken);
        }
    };

    const handleSave = () => {
        if (onEditProcess) {
            onEditProcess(process.id, editedProcess, authToken);
        }
        setIsEditing(false);
    };

    return (
        <Card.Header className="d-flex justify-content-between align-items-center">
            {isEditing ? (
                <FormProcessEdit
                    process={editedProcess}
                    onSave={handleSave}
                    onCancel={() => {setIsEditing(false); window.location.reload();}}
                    setEditedProcess={setEditedProcess}
                />
            ) : (
            <>
                <h5 className="mb-0">
                    {process.name}
                    <Badge bg="secondary" className="ms-2">
                        Processo
                    </Badge>
                </h5>
                {admin && (
                    <div>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                            title="Editar processo"
                        >
                            <FaEdit />
                        </Button>
                        {onDeleteProcess && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleDelete}
                                title="Excluir processo"
                            >
                                <FaTrash />
                            </Button>
                        )}
                    </div>
                )}
            </>
            )}
        </Card.Header>
    );
};