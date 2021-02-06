import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';


import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText,} from './styles';
import uberx from '../../assets/uberx.png'

export default function Details() {

    const AnimatedContainer = Animated.createAnimatedComponent(Container);

    const[position, setPosition] = useState(new Animated.Value(300));

    useEffect(() => {
        Animated.timing(position, {
            duration: 500,
            toValue: 0,
            useNativeDriver: true
        }).start();
    },[]);
    
    return(
        <AnimatedContainer style={{ transform: [{ translateY: position}]}} >
            <TypeTitle>Popular</TypeTitle>
            <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

            <TypeImage source={uberx} />
            <TypeTitle>UberX</TypeTitle>
            <TypeDescription>R$ 6,00</TypeDescription>

            <RequestButton onPress={() => {}}>
                <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
            </RequestButton>
        </AnimatedContainer>
    );
}