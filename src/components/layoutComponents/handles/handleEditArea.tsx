import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { AreaPut } from "../../types/processTree";

export function handleEditAreaPut(areaId: number, editedArea: AreaPut, authToken: string, navigate: NavigateFunction) {
    const id = areaId
    const urlCode = `${import.meta.env.VITE_API_URL}/tree/${id}`;
    axios.put(urlCode, {
        name: editedArea.name,
        description: editedArea.description
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