import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Navbar, Container, Nav, Form, Button, NavDropdown } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { addToHistory } from '@/lib/userData'
import { getToken, readToken, removeToken } from '@/lib/authenticate'

export default function MainNav() {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let token = readToken()

    function logout() {
        setIsExpanded(false)
        removeToken()
        router.push('/login')
    }

    async function submitForm(e) {
        e.preventDefault() // prevent the browser from automatically submitting the form
        setSearchHistory(await addToHistory(`title=true&q=${search}`))
        router.push(`/artwork?title=true&q=${search}`)
        setIsExpanded(false)
    }
    return (
        <>
            <Navbar expanded={isExpanded} expand="lg" className="bg-body-tertiary  fixed-top">
                <Container>
                    <Navbar.Brand>Ali Omar </Navbar.Brand>
                    <Navbar.Toggle
                        onClick={() => {
                            setIsExpanded(!isExpanded)
                        }}
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === '/'}>Home</Nav.Link>
                            </Link>
                            {token && (
                                <>
                                    <Link href="/search" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === '/search'}>Advanced Search</Nav.Link>
                                    </Link>
                                    <Form onSubmit={submitForm} className="d-flex">
                                        <Form.Control
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button type="submit" variant="outline-success">
                                            Search
                                        </Button>
                                    </Form>
                                    <Nav>
                                        <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                            <Link href="/favourites" passHref legacyBehavior>
                                                <NavDropdown.Item
                                                    onClick={() => {
                                                        setIsExpanded(false)
                                                    }}
                                                    active={router.pathname === '/favourites'}
                                                >
                                                    Favourites
                                                </NavDropdown.Item>
                                            </Link>
                                            <Link href="/history" passHref legacyBehavior>
                                                <NavDropdown.Item
                                                    onClick={() => {
                                                        setIsExpanded(false)
                                                    }}
                                                    active={router.pathname === '/history'}
                                                >
                                                    Search History
                                                </NavDropdown.Item>
                                            </Link>
                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </>
                            )}
                            {!token && (
                                <Nav className="ml-auto">
                                    <Link href="/register" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === '/register'}>Register</Nav.Link>
                                    </Link>
                                    <Link href="/login" passHref legacyBehavior>
                                        <Nav.Link active={router.pathname === '/login'}>Login</Nav.Link>
                                    </Link>
                                </Nav>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}
