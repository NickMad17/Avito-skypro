import styled from 'styled-components';


export const Main = styled.main`
    display: flex;
    flex-flow: column;
    gap: 25px;

    @media (max-width: 767px) {
        margin-bottom: 30px;
        padding-top: 20px;
        gap: 20px;
    }
`;

export const MainTitle = styled.h1`
    color: #000;
    font-size: 40px;
    font-weight: 500;
    line-height: 220%;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const MainSubtitle = styled.h2`
    color: #000;
    font-size: 32px;
    font-weight: 500;
    line-height: 220%;

    @media (max-width: 767px) {
        margin-bottom: 10px;
        font-size: 18px;
        line-height: 100%;
    }
`;
