import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    wrapper:{
        height:'100%',
        backgroundColor:'#34495E',
    },
    text:{
        color:'white',
        marginBottom:50,
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        fontFamily:'Helvetica',
    },
    slide:{
        backgroundColor:'yellow'
    },
    details:{
        justifyContent:'center',
        backgroundColor:'#283747',
        height:'100%'
    },signupbutton:{
        padding:10,
        marginTop:10,
        alignItems:'center',
        borderWidth:1,
        borderRadius:50,
        backgroundColor:'#FFC300',
    },
    signup:{
        padding:10,
        marginTop:10,
        alignItems:'center',
        borderWidth:1,
        borderRadius:50,
        backgroundColor:'#FFC300',
        marginTop:50
    },
    input:{
        backgroundColor:'#ffff',
        borderRadius:10
    },
    image: {
        height:150,
        width:150,
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:75,
      },
      
    touch: {
        height:150,
        width:150,
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:75,
        marginBottom:50,
      },
      touchimage: {
          padding:10,
        height:150,
        width:150,
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:75,
      },
      textinput:{
          color:'black',
          borderWidth:1,
          padding:10,
          borderRadius:10,
          backgroundColor:'white',
      },
      groupsearch:{
          color:'black',
          backgroundColor:'white',
          borderRadius:10,
          paddingHorizontal:10,
      },
      groups:{
          padding:10,
          flexDirection:'row',
      },
      button:{
          backgroundColor:'pink',
          padding:10,
          borderRadius:10,
          justifyContent:'center',
      }
});