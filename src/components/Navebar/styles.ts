import styled from 'styled-components';

export const Container = styled.div`
    .navbar {
    height: 5rem;
    display: flex;
    justify-content: start;
    align-items: center;
    }

    .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    color: #11101d;
    }

    .nav-menu {
    background-color: #11101d;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;

    }

    .nav-menu.active {
    left: 0;
    transition: 350ms;
    }

    .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
    }

    .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
    }

    .nav-text a:hover {
    background-color: #1a83ff;
    }

    .nav-menu-items {
        width: 100%;
    }

    .navbar-toggle {
    background-color: #11101d;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
    }

    span {
    margin-left: 16px;
    }
`;