import React , {useState,useEffect} from 'react';
import {View,Text, TouchableOpacity,Image,ActivityIndicator, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Input from '../elements/Input'
import styles from './style'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Dimensions } from 'react-native';
const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Join and Create\nGroups',
    image: require('../icons/groups.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Post Your Thoughts',
    image: require('../icons/atom.png'),
    backgroundColor: '#febe29',
  },
];
export default function details({navigation}){
    const[mobile,setmobile]=useState('')
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState('');
    const [login, setlogin] = useState(false);
    async function signInWithPhoneNumber(phoneNumber) {
      setlogin(true)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    }
    async function confirmCode() {
    try {
      await confirm.confirm(code);
      auth().onAuthStateChanged((user)=>{
        if(user.displayName==null){
          navigation.replace('check')
        }
        else{
          navigation.replace('Login')
        }
      })
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
      auth().onAuthStateChanged((user)=>{
          if(user){
              if(user.displayName==null){
                navigation.replace('check')
              }
              else{
                navigation.replace('Login')
              }
          }
      })      
  }, []);
  const [load,setload]=useState(false)
  if(confirm){
      return(
        <View  style={styles.details}>
          <Input placeholder="Enter OTP" type='number-pad' onChangeText={setCode} />
          <TouchableOpacity style={[styles.signup,{flexDirection:'row',justifyContent:'center'}]} onPress={confirmCode} >
            <Text>Login</Text>
            <ActivityIndicator color="brown"/>
          </TouchableOpacity>
        </View>
      )      
  }
  if(load){
    return(
      <View style={styles.details} >
          <Image source={require('../icons/icon.png')} style={{width:Dimensions.get('screen').width,height:200}} resizeMode="contain" />
          <View style={{padding:10}} >
          <Input placeholder="Mobile Number" type="number-pad" onChangeText={setmobile}/>
          <TouchableOpacity disabled={login} style={[styles.signup,{flexDirection:'row',justifyContent:'center'}]} onPress={()=>{signInWithPhoneNumber("+91"+mobile)
        }}  >{login&&<ActivityIndicator color='brown' />}<Text>Login</Text></TouchableOpacity>
      
          </View>
      </View>
      );

  }
  _renderItem = ({ item }) => {
    return (
      <View style={[styles.wrapper,{backgroundColor:item.backgroundColor}]}>
        <Image source={item.image} style={{padding:10, width:Dimensions.get('screen').width}} resizeMode="contain" />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    setload(true)
  }
  return(
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}/>    
    );
}