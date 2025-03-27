import React from 'react';
import {  ListGroup,  } from 'react-bootstrap';
import { FaTools, FaFileAlt, FaUserTie } from 'react-icons/fa';

import { ProcessFormData } from '../../types/processFormData';

interface ProcessTreeViewProps {
    process: ProcessFormData
}

export function ListGroupProcess({ process }: ProcessTreeViewProps ) {
        return (
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
        );
    };