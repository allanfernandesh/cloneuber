import styled from 'styled-components/native';


export const Container = styled.View`
    background: #fff;
    height: 300px;
    width: 100%;
    position: absolute;
    bottom: 0;
    shadow-color: #000;
    shadow-offset: 0 0;
    shadow-opacity: 0.2;
    elevation: 5;
    border: 1px solid #DDD;
    align-items: center;
    padding: 20px;
`;


export const TypeTitle = styled.Text`
    font-size: 20px;
    color: #222;
`;



export const TypeDescription = styled.Text`
    color: #666;
    font-size: 14px;
`;

export const TypeImage = styled.Image`
    height: 80px;
    margin: 10px 0;
`;



export const RequestButton = styled.TouchableOpacity`
    background: #222;
    align-items: center;
    justify-content: center;
    height: 44px;
    margin-top: 10px;
    align-self: stretch;

`;

export const RequestButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;





