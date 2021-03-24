import { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container, Title, MemberInfo, MemberImage, MembersList, MemberLogin } from './styles';

function Dashboard(){
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchMembers(){
            await api.get('/orgs/grupotesseract/public_members')
            .then(response => setMembers(response.data))
        }
        fetchMembers();
    }, []);

    return (
        <Container>
            <Title>Membros do Grupo Tesseract</Title>
            <MembersList>
                { members.map(member => (
                    <MemberInfo>
                        <MemberImage src={member.avatar_url} alt=""/>  
                        <MemberLogin>{member.login}</MemberLogin>
                    </MemberInfo>
                ))}
            </MembersList>
        </Container>
    );
}

export default Dashboard;