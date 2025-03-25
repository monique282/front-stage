import axios from "axios";
import { SyntheticEvent } from "react";
import { NavigateFunction } from "react-router-dom";

export function handleRegister(e: SyntheticEvent,
    formData: FormData,
    setError: (error: string) => void,
    setLoading: (loading: boolean) => void,
    authToken: string | null,
    navigate: NavigateFunction)  {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        return setError('Por favor, insira um email válido');
    };

    if (formData.password !== formData.confirmPassword) {
        return setError('As senhas não coincidem');
    };

    if (formData.password.length < 8) {
        return setError('A senha deve ter pelo menos 8 caracteres');
    };


    setLoading(true);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    };

    axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
            email: formData.email,
            password: formData.password,
            role: formData.role
        },
        config
    )
        .then((response) => {
            alert("Cadastro realizado com sucesso")
            navigate("/")
        })
        .catch((err) => {
            console.error('Erro no registro:', err);
            if (err.response) {
                setError(err.response.data || 'Erro ao registrar. Tente novamente.');
            } else if (err.request) {
                setError('Sem resposta do servidor. Verifique sua conexão.');
            } else {
                setError('Erro ao configurar a requisição.');
            }
        })
        .finally(() => {
            setLoading(false);
        });
};

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}