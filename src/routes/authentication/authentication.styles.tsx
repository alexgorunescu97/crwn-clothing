import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;

    @media screen and (max-width: 800px) {
        width: 100%;
        align-items: center;
        row-gap: 100px;
        flex-direction: column;
    }
`;