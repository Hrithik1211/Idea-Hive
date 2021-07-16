import React ,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,TextInput,ActivityIndicator} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import Questions from '../elements/Input/Questions';
import { Icon } from 'react-native-elements';
import CustomList from '../elements/CustomList';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
export default function Groups({navigation}) {
    const user = auth().currentUser
    const [item,setitem] =useState([]);
    const [qitem,setqitem] =useState([]);
    const [loading,setloading] =useState(true)
    useEffect(()=>{
        database().ref('/username/'+user.displayName+'/groups')
        .once('value').then(snapshot=>{
            var items=[];
            var itemsq=snapshot.val();
            setqitem(itemsq)
            for(var key in itemsq){
                database().ref('/groups/'+key+'/')
                .once('value').then(snapshot=>{
                    var j=snapshot.val();
                    if(j){
                        j.display='groups'
                        items.push(j);
                        setitem(items)
                    
                    }
                })
            }
            setloading(false)
        })
    },[])
    if (loading) {
      return (
        <View style={[styles.wrapper,{justifyContent:'center'}]} >
        <ActivityIndicator color='pink' />
    </View>
      )
    }
    return (
        <View style={styles.wrapper} >
            <View style={styles.groups}>
                <View style={{flex:1,paddingHorizontal:10}} >
                <View style={{backgroundColor:'white',paddingHorizontal:10,width:'auto',flex:1, justifyContent:'center',borderRadius:10}}>
                    <Text onPress={()=>{navigation.navigate('search',{item:qitem})}} style={{paddingHorizontal:20,color:'grey'}} >Search Groups</Text>                
                </View>
                </View>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('CreateGroup')}} >
            <Icon name='add' color="white"  />
            </TouchableOpacity>
            </View>
            <CustomList itemList={item} />
            <View style={{justifyContent:'center'}} >         
            <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/8161208541"
/>
    
            </View>
    
        </View>
    )
}
