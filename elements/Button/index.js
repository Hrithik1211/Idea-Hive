import React from 'react';
import {TouchableOpacity,Text,ActivityIndicator} from 'react-native';
import styles from './style';
import { SignIn } from '../../navigation/auth';
import { useNavigation } from '@react-navigation/native';
const Button=({navigation})=>{
    const {navigate} =useNavigation()
    return (
        <TouchableOpacity style={styles.button} onPress={()=>{SignIn();navigate('Splash') }}
        >
            <Text style={{color:'white'}}>Login</Text>
            <ActivityIndicator color='pink' />
        </TouchableOpacity>
    );
};
export default Button;