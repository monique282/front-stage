import React, { useContext } from 'react';
import {  Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/contex';
import { NavigateFunction } from 'react-router-dom';
import { AreaPut } from '../../types/processTree';

interface FormProcessProps {
    editingAreaId: number | null;
    onEditArea?: (
        areaId: number,
        editedArea: Partial<AreaPut>,
        authToken: string,
        navigate: NavigateFunction
    ) => void;
    editedArea: Partial<AreaPut>;
    setEditingAreaId: React.Dispatch<React.SetStateAction<number | null>>;
    setEditedArea: React.Dispatch<React.SetStateAction<Partial<AreaPut>>>;
    navigate: NavigateFunction;
}

export function FormProcess({ editingAreaId, onEditArea, editedArea, setEditingAreaId, setEditedArea, navigate }: FormProcessProps ) {
    const { authToken } = useContext(AuthContext) as { admin: boolean; authToken: string; };
    
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

    return (
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
    );
};