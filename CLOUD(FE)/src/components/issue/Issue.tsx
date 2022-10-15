import React from 'react';
import { Button, Dimmer, Loader, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import useIssue, { issueType } from '../../hooks/issue/useIssue';
import useModal from '../../hooks/common/useModal';
import IssueModal from './issueModal';
import IssueDeleteModal from './IssueDeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IssueBlock = styled.div`
    padding: 2rem;
    .sub-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Issue = () => {
    
    const {issues, onChangeInput, loading, open, onClickModal, modals, id , handleDeleteIssue} = useIssue();
    const issueList = issues.map((issue: issueType) => {
        const {type, subject, created_at, mandatory, id} = issue;
        return (
            <Table.Row key={id}>
                <Table.Cell>{subject}</Table.Cell>
                <Table.Cell>{type}</Table.Cell>
                <Table.Cell>{created_at}</Table.Cell>
                <Table.Cell>{mandatory === 1 ? '필수' : '선택'}</Table.Cell>
                <Table.Cell textAlign='center' width={2}>
                    <Button.Group >
                        <Button basic color='red' icon="delete" onClick={()=>onClickModal(modals.deleteIssue, id)}></Button>

                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        )
    });
    return (
        <IssueBlock>
            { loading && 
                (<Dimmer active inverted>
                    <Loader size='large'>시험 불러오는 중...</Loader>
                </Dimmer>)
            }
            <div className='sub-header'>
                <h1>시험관리</h1>
                <Button primary onClick={()=>onClickModal(modals.addIssue)}>시험 추가</Button>
            </div>
             <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>이름</Table.HeaderCell>
                    <Table.HeaderCell>유형</Table.HeaderCell>
                    <Table.HeaderCell>필수여부</Table.HeaderCell>
                    <Table.HeaderCell>생성일</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">설정</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issueList}
                </Table.Body>
            </Table>
            <IssueModal open={open.addIssue}  onClickModal={onClickModal} onChangeInput={onChangeInput} name={modals.addIssue}></IssueModal>
            <IssueDeleteModal id={id} open={open.deleteIssue} onClickModal={onClickModal} handleDeleteIssue={handleDeleteIssue} name={modals.deleteIssue}></IssueDeleteModal>
        </IssueBlock>
    )
}

export default Issue;