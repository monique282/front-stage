import React, { useContext, useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GiFruitTree } from 'react-icons/gi';
import { AuthContext,  } from '../contexts/contex';
import ProcessTreeView from '../components/layoutComponents/processTreeView';
import axios from 'axios';

export default function Layout() {
    const { logout, authToken, admin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [sampleAreas, setSampleAreas] = useState([])
    function handleLogout() {
        logout();
        navigate('/login');
    };

    useEffect (()=>{
        const urlCode = `${import.meta.env.VITE_API_URL}/tree`;
            axios.get(urlCode)
                .then((response) => {
                    setSampleAreas(response.data)
                })
                .catch((err) => {
                    console.error('Erro completo:', err);
                    console.error('Resposta de erro:', err.response?.data);
                    
                })
    },[]) 
   
    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <GiFruitTree size={30} className="me-2" />
                        Árvores de Processo
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {admin && (
                                <>
                                    <Nav.Link as={Link} to="/register" className="mb-3 mb-lg-0 me-lg-3">Cadastrar novo usuario </Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Nav>
                            {authToken ? (
                                <>
                                    <Button variant="outline-danger" className="mb-4 mb-lg-0 me-lg-3"  onClick={handleLogout}>
                                        Sair
                                    </Button>
                                </>

                            ) : (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mb-5">
                <ProcessTreeView areas={sampleAreas} />
            </Container>
        </>
    );
}