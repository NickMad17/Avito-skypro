import styled from 'styled-components';


interface IProps {
  $isFocused: boolean;
}

export const Label = styled.label<IProps>`
    color: ${(props) => (props.$isFocused ? '#009EE4' : '#c4c4c4')};
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;

    @media (max-width: 767px) {
        font-size: 14px;
        font-weight: 400;
    }
`;

export const Input = styled.input<IProps>`
    width: 300px;
    height: 50px;
    padding: 13px 19px;
    border-radius: 6px;
    border: 1px solid ${(props) => (props.$isFocused ? '#009EE4' : 'rgba(0, 0, 0, 0.20)')};
    outline: none;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;

    @media (max-width: 1024px) {
        width: 250px;
    }

    @media (max-width: 767px) {
        width: 100%;
        height: 40px;
        border-radius: 30px;
    }
`;

export const InputPhone = styled(Input)`
    width: 614px;

    @media (max-width: 1024px) {
        width: 500px;
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;
