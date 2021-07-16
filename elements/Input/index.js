import React from 'react';
import{TextInput,View,Text,} from 'react-native';
import styles from './style';
const Input=({placeholder,type,length,onChangeText,error,...props})=>{
    const [bcolor,setbcolor]=React.useState('grey');
    const [bwidth,setbwidth]=React.useState(1);
    return(
        <View>
            <TextInput placeholder={placeholder} style={[styles.textInput,{borderColor: error?'red':bcolor ,borderWidth:bwidth}]}
            keyboardType={type} 
            onChangeText={onChangeText}
            onFocus={()=>{setbcolor('#82E0AA');setbwidth(2)}}
            onBlur={()=>{setbcolor('grey');setbwidth(1)}}
            {...props}
            />
            {error&&<Text style={styles.error}>{error}</Text>}
        </View>
    );
};
export default Input;