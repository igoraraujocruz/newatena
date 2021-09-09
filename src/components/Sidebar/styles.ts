import styled from 'styled-components';

export const Nav = styled.nav`
  background: #0F2F4F;
  height: 100%;
  width: 12rem;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  display: block;
  text-align: center;

  .sidebar li .tooltip{
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}


  p {
    margin-top: 1.5rem;
    color: white;
    transition: all 0.2s ease-in-out;
    padding: 1rem;
    &:hover {
    transition: all 0.2s ease-in-out;
    border-color: #A4A4A4;
    background: #f0f2f5;
    color: #010606;
    border-radius: 1rem 0 0 1rem;
    }  
  }

`;

export const NavBtn = styled.nav`
  display: flex;
  justify-content: center;

  input {
    width: 20rem;
    height: 3rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 1280px) {
    display: none;
  }
`;
