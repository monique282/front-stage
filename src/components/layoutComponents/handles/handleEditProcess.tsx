import axios from "axios";
import { ProcessPut } from "../../types/processFormData";

export function handleEditProcess(processId: string, editedProcess: ProcessPut, authToken: string) {
    const id = processId
    const urlCode = `${import.meta.env.VITE_API_URL}/tree/process/${id}`;
    axios.put(urlCode, {
        name: editedProcess.name,
        description: editedProcess.description,
        tools: editedProcess.tools,
        responsible: editedProcess.responsible,
        documents: editedProcess.documents,
    }, {
        headers: { Authorization: `Bearer ${authToken}` }
    })

        .then((response) => {
            alert("Edição realizada com sucesso");
            window.location.reload();
        })
        .catch((err) => {
            console.error('Erro no registro:', err);
            if (err.response) {
                alert(err.response.data || 'Erro ao ediar area. Tente novamente.');
            } else if (err.request) {
                alert('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                alert('Erro ao configurar a requisição.');
            }
        })

};