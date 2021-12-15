import styled from "styled-components";

export const Wrapper= styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width: 500px;
border: 1px solid lightgray;
border-radius: 20px;
height: 100%;

button {
  border-radius: 0 0 20px 20px;
  width: 100%;

}

img {
  max-height: 400px; 
  object-fit:  scale-down;
  border-radius: 20px 20px 0 0;
}

div {
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
  height: 100%; 
}
`