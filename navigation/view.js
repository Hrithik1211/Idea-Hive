import { useNavigation } from '@react-navigation/native';
import React ,{useState} from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native';
import styles from './style'
import database from '@react-native-firebase/database'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
export default function view({route,navigation}) {
  const {username} = route.params;
    const {navigate} = useNavigation();
    const [clas,setclas] = useState({}) 
    const [load,setload] = useState(true)
    if(load)
    database().ref('/username/'+username+'/')
    .once('value').then(snapshot=>{
        setclas(snapshot.val())
        setload(false)
    })
    return (
        <View style={styles.wrapper}>
            <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:30,
                fontWeight:'bold'
        
        }} >Profile</Text><TouchableOpacity style={styles.image} onPress={()=>{navigation.navigate('Image',{url:clas.image})}} >
                <Image style={[styles.image,{borderWidth:2,borderColor:'#F4D03F'}]} source={{uri:clas.image}  } />
            </TouchableOpacity>
            <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:20,
        
        }} >Username: {clas.username}</Text>
            <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:20,
              
        }}>User: {clas.class}</Text>
        <TouchableOpacity style={{padding:10,borderRadius:10}} onPress={()=>{navigate('posted',{username:clas.username})}} >
            <Text style={{
                backgroundColor:'#F9E79F',
                borderRadius:10,
                textAlign:'center',
                color:'#34495E',
                padding:5,
                fontSize:20,
        
        }} >Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigate('bmk',{username:clas.username})}} style={{padding:10,borderRadius:10}} >
            <Text style={{
                backgroundColor:'#F9E79F',
                borderRadius:10,
                textAlign:'center',
                color:'#34495E',
                padding:5,
                fontSize:20,
        
        }} >Bookmarked</Text>
        </TouchableOpacity>
        <View style={{marginTop:'auto'}} >
        <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/4124996276"
/>
        </View>
        </View>
    )
}
