import styled from "styled-components";
import Modal from '@material-ui/core/Modal'

export const Wrapper = styled.aside`
font-family: 'Poppins', sans-serif;
width: 500px;
padding: 20px

`

export const ModalStyled = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;

.modalForconfirm {
  position: absolute;
  width: 450px;
  background-color: white;
  box-shadow: gray;
  padding: 20px;
  border-radius: 20px;

  li {
    list-style: none; 
  }
}
`