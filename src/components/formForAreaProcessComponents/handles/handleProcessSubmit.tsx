import axios from "axios";
import { ProcessFormData } from "../../../types/processFormData";

interface HandleProcessSubmitParams {
    e: React.FormEvent;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setSuccess: React.Dispatch<React.SetStateAction<string>>;
    setProcessForm: React.Dispatch<React.SetStateAction<ProcessFormData>>;
    setShowProcessModal: React.Dispatch<React.SetStateAction<boolean>>;
    authToken: string | null;
    processForm: ProcessFormData
} 

export function  handleProcessSubmit ({
    e, setError, setSuccess, setProcessForm, setShowProcessModal, authToken, processForm
}: HandleProcessSubmitParams ) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const urlCode = `${import.meta.env.VITE_API_URL}/tree/postProcess`;
    axios.post(urlCode, {
        name: processForm.name,
        description: processForm.description,
        areaId: processForm.areaId,
        tools: processForm.tools,
        responsible: processForm.responsible,
        documents: processForm.documents
    }, {
        headers: { Authorization: `Bearer ${authToken}` }
    })
        .then((response) => {
            setSuccess('Processo criado com sucesso!');
            setProcessForm({
                name: '',
                description: '',
                areaId: 0,
                tools: [],
                responsible: [],
                documents: []
            });
            setTimeout(() => setShowProcessModal(false), 1500);
        })
        .catch((err) => {
            console.error('Erro no registro:', err);
            if (err.response) {
                alert(err.response.data || 'Erro ao registrar. Tente novamente.');
            } else if (err.request) {
                alert('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                alert('Erro ao criar processo.');
            }
        })
};