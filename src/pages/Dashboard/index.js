import { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Title, InputSearch, MemberInfo, MemberImage, MembersList, MemberLogin, LoginNotFoundMessage } from './styles';

function Dashboard(){
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [inputValue, setInputValue] = useState('');


    function search(text){
        let filtered = members.filter(function (member){
            let memberLogin = member.login ? member.login.toLowerCase() : '';
            let searchText = text.toString().toLowerCase();
            return memberLogin.indexOf(searchText) > -1;
        });
        setFilteredMembers(filtered);
        setInputValue(text);
    }

    useEffect(() => {
        async function fetchMembers(){
            await api.get('/orgs/grupotesseract/public_members')
            .then(response => {
                setMembers(response.data);
                setFilteredMembers(response.data);
            })
        }
        fetchMembers();
    }, []);

    return (
        <Container>
            <Title>Membros do Grupo Tesseract</Title>
            <InputSearch 
                type="text" 
                value={inputValue} 
                placeholder="Pesquisa por login" 
                onChange={event => search(event.target.value)}
            />
            <MembersList>
                { (filteredMembers.length > 0) 
                    ? filteredMembers.map(member => (
                        <MemberInfo>
                            <MemberImage src={member.avatar_url} alt=""/>  
                            <MemberLogin>{member.login}</MemberLogin>
                        </MemberInfo>
                    )) 
                    : (<LoginNotFoundMessage>Login não encontrado</LoginNotFoundMessage>)
                }
            </MembersList>
        </Container>
    );
}

export default Dashboard;