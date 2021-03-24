import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 80%;
    margin: auto;
`;

export const Title = styled.h1`
    font-family: Sans-Serif;
    font-size: 2rem;
    text-align: center;
    color: #323232;
    margin: 3% 0 5% 0;
`;

export const InputSearch = styled.input`
    font-size: 1rem;
    color: #454545;

    width: 50%;
    margin-bottom: 3%;
    padding: 1%;

    border-color: #6c6c6c;
`; 

export const MembersList = styled.div`
    display: flex;
    flex-diretion: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;

    width: 70%;
`;

export const MemberInfo = styled.div`
    display: flex;    
    flex-direction: column;
    align-items: center;
    margin: 2%;
`;

export const MemberImage = styled.img`
    width: 10vw;
    min-width: 100px;
    border-radius: 50%;
`;

export const MemberLogin = styled.p`
    font-family: Sans-Serif;
    font-size: 1rem;
    font-weight: 600;
    color: #6c6c6c;
`;

export const LoginNotFoundMessage = styled.p`
    font-family: Sans-Serif;
    font-size: 1.5rem;
    text-align: center;
    color: #4f4f4f;  
`;