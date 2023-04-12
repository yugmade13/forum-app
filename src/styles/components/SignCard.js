import styled from 'styled-components';

const SignCard = styled.div`
  width: 375px;
  background: #fff;
  color: #252525;
  padding: 24px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: "Source Sans Pro", sans-serif;
  
  h1 {
    text-align: center;
    font-size: 24px;
  }
  
  input {
    margin-bottom: 12px;
    background: var(--color-grey);
    width: 100%;
    border-radius: 25px;
  }
  
  button {
    display: block;
    background: var(--color-blue);
    width: 100%;
    padding: 8px;
    border-radius: 25px;
    color: var(--color-white);
  }
  
  span {
    display: block;
    text-align: center;
    font-size: 14px;
  }
`;

export default SignCard;