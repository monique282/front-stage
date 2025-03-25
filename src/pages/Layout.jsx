import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { GiFruitTree } from 'react-icons/gi';
import { useAuth } from '../contexts/contex';

export default function Layout() {
    const { logout, authToken, admin } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/login');
    };


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
                <Outlet />
            </Container>
        </>
    );
}