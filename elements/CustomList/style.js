import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    view:{
        backgroundColor:'#F9E79F',
        borderRadius:20,
    },
    image:{
        height:400,
    },
    wrapper:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    buttons:{
        flexDirection:'row',
        textAlign:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'#34495E',
        paddingVertical:8,
        paddingHorizontal:20,
    },
    text:{
        fontWeight:'bold',
        marginLeft:10,
    },
    comment:{
        fontSize:20,
    }
});