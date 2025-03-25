import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/contex';
import { handleRegister } from '../components/layoutComponents/handleRegister';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, authToken } = useAuth();
    const navigate = useNavigate();

    function handleChange (e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        handleRegister(
            e,
            formData,
            setError,
            setLoading,
            authToken,
            login,
            navigate
        );
    };

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setError('');

    //     if (formData.password !== formData.confirmPassword) {
    //         return setError('As senhas não coincidem');
    //     }
    //     if (formData.password.length < 8) {
    //         return setError('A senha deve ter pelo menos 8 caracteres');
    //     }

    //     setLoading(true);

    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${authToken}`
    //         }
    //     };
    //     axios.post(
    //         `${import.meta.env.VITE_API_URL}/user/register`,
    //         {
    //             email: formData.email,
    //             password: formData.password,
    //             role: formData.role
    //         },
    //         config
    //     )
    //         .then((response) => {
    //             console.log('Resposta do registro:', response.data);
    //             if (response.data.token) {
    //                 login(response.data.token, response.data.user);
    //                 navigate('/');
    //             } else {
    //                 navigate('/login', {
    //                     state: {
    //                         success: 'Registro realizado com sucesso! Faça login.'
    //                     }
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.error('Erro no registro:', err);

    //             if (err.response) {
    //                 setError(err.response.data.message || 'Erro ao registrar. Tente novamente.');
    //             } else if (err.request) {
    //                 setError('Sem resposta do servidor. Verifique sua conexão.');
    //             } else {
    //                 setError('Erro ao configurar a requisição.');
    //             }
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">
                                <h3>Cadastrar Novo Usuário</h3>
                            </Card.Title>

                            {error && (
                                <Alert variant="danger" dismissible onClose={() => setError('')}>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="exemplo@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmar Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Digite a senha novamente"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Tipo de Usuário</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        <option value="USER">Usuário Normal</option>
                                        <option value="ADMIN">Administrador</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Registrando...
                                            </>
                                        ) : 'Registrar'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}