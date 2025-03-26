import axios from "axios";

export function handleDeleteArea(processId: string, authToken: string) {
    const id = processId
    // const urlCode = `${import.meta.env.VITE_API_URL}/tree/deleteProcess/${id}`;
    // axios.delete(urlCode, {
    //     headers: { Authorization: `Bearer ${authToken}` }
    // })
    //     .then((response) => {
    //         alert("Exclusão realizada com sucesso");
    //         window.location.reload();
    //     })
    //     .catch((err) => {
    //         console.error('Erro no registro:', err);
    //         if (err.response) {
    //             alert(err.response.data || 'Erro ao registrar. Tente novamente.');
    //         } else if (err.request) {
    //             alert('Sem resposta do servidor. Verifique sua conexão.');
    //         } else {
    //             alert('Erro ao configurar a requisição.');
    //         }
    //     })
};