import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import {  FaTrash } from 'react-icons/fa';
import { Process } from '../../types/processTree';

interface CardHeaderProps {
    admin: boolean;
    process: Process;
    onDeleteProcess?: (processId: string, authToken: string) => void;
    authToken: string;
}

export function CardHerder({ admin, process, onDeleteProcess, authToken }: CardHeaderProps) {
   
    const handleDeleteProcess = (processId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDeleteProcess) {
            onDeleteProcess(processId, authToken);
        }
    };
        return (
          
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
                    
    );
};