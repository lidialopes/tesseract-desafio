import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { 
    Container, 
    Title, 
    InputSearch, 
    MemberContainer, 
    MemberImage, 
    MembersList, 
    MemberLogin, 
    MembersListMessage,
    PopupContainer,
    PopupImage,
    PopupInfo,
    PopupText
} from './styles';

function Dashboard(){
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Carregando lista de membros...');
    
    const [memberInfo, setMemberInfo] = useState();
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    function search(text){
        let filtered = members.filter(function (member){
            let memberLogin = member.login ? member.login.toLowerCase() : '';
            let searchText = text.toString().toLowerCase();
            return memberLogin.indexOf(searchText) > -1;
        });
        setFilteredMembers(filtered);
        setInputValue(text);
        setMessage('Login não encontrado');
    }

    function handleOpenModal(login){
        fetchMemberInfo(login);
        openModal();
    }

    function formatDate(date){
        return date.substr(8,2) 
            + '/' + date.substr(5,2) 
            + '/' + date.substr(0,4);
    }

    async function fetchMemberInfo(login){
        await api.get(`/users/${login}`)
            .then(response => setMemberInfo(response.data));
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
                        <MemberContainer onClick={() => handleOpenModal(member.login)}>
                            <MemberImage src={member.avatar_url} alt=""/>  
                            <MemberLogin>{member.login}</MemberLogin>
                        </MemberContainer>
                    )) 
                    : (<MembersListMessage>{message}</MembersListMessage>)
                }
            </MembersList>
            <Modal open={open} onClose={closeModal} center>
                <PopupContainer>
                    <PopupImage src={memberInfo.avatar_url} alt=""/>

                    <PopupInfo>
                        <PopupText><strong>Nome:</strong> {memberInfo.name}</PopupText>
                        <PopupText><strong>Repositórios:</strong> {memberInfo.public_repos}</PopupText>
                        <PopupText><strong>Seguidores:</strong> {memberInfo.followers}</PopupText>
                        <PopupText><strong>Ingresso:</strong> {formatDate(memberInfo.created_at)}</PopupText>
                    </PopupInfo>
                </PopupContainer>
            </Modal>
        </Container>
    );
}

export default Dashboard;