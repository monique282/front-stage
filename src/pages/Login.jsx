import React from 'react';
import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/contex';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAuthToken, setAdmin } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const urlCode = `${import.meta.env.VITE_API_URL}/user/login`;
        const data = {
            email,
            password
        };

        axios.post(urlCode, data)
            .then((response) => {
                const token = response.data[1]?.token;
                if (!token) {
                    throw new Error('Token não recebido na resposta');
                }
                if (response.data[0].role === "ADMIN") {
                    setAdmin(true)
                }
                setAuthToken(token);
                localStorage.setItem('authToken', token);

                navigate("/");
            })
            .catch((err) => {
                console.error('Erro completo:', err);
                console.error('Resposta de erro:', err.response?.data);
                setError(err.response?.data?.message || 'Falha no login - verifique suas credenciais');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">
                                <h3>Login</h3>
                            </Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Senha</Form.Label>
                                    <div className="input-group"> 
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Sua senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                            type="button" 
                                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                        >
                                            {showPassword ? "👁️" : "👁️‍🗨️"} 
                                        </Button>
                                    </div>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Carregando...' : 'Entrar'}
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Link to="/forgot-password">Esqueceu a senha?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}