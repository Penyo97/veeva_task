import styled from "styled-components";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        navigate("/")
    }

    return (
        <HeaderContainer>
            <Button type={"text"} variant={"text"} onClick={logout} style={{marginRight: 5}} color="cyan">Log
                out</Button>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #828A95;
  margin-bottom: 1rem;
  height: 50px;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
`