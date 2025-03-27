import axios from "axios";

interface HandleAreaSubmitParams {
    e: React.FormEvent;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setSuccess: React.Dispatch<React.SetStateAction<string>>;
    setAreaForm: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
    }>>;
    areaForm: {
        name: string;
        description: string;
    };
    setShowAreaModal: React.Dispatch<React.SetStateAction<boolean>>;
    authToken: string | null;
}

export function handleAreaSubmit({ e, setError, setSuccess, setAreaForm, setShowAreaModal, authToken, areaForm }: HandleAreaSubmitParams) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const urlCode = `${import.meta.env.VITE_API_URL}/tree/postArea`;
    axios.post(urlCode, {
        name: areaForm.name,
        description: areaForm.description
    }, {
        headers: { Authorization: `Bearer ${authToken}` }
    })
        .then((response) => {
            setSuccess('Área criada com sucesso!');
            setAreaForm({ name: '', description: '' });
            setTimeout(() => setShowAreaModal(false), 1500);
        })
        .catch((err) => {
            console.error('Erro no registro:', err);
            if (err.response) {
                alert(err.response.data || 'Erro ao registrar. Tente novamente.');
            } else if (err.request) {
                alert('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                alert('Erro ao criar área.');
            }
        })
};
