import React ,{useState,useEffect} from 'react';
import {View,Text,BackHandler} from 'react-native';
import CustomList from '../elements/CustomList';
import styles from './style';
import database from '@react-native-firebase/database'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
const posted=({route,navigation})=>{
    const {username}=route.params;
    const [items,setitems] =useState([]);
    database().ref('/username/'+username+'/questions/').
    once('value').then(snapshot=>{
        var item = snapshot.val()
        var itemsq=[]
        for(var key in item){
            item[key].display='posted'
            item[key].quest=key
            itemsq.push(item[key])
        }
        setitems(itemsq)
    })
    return(
        <View style={[styles.wrapper,{
            backgroundColor:'#34495E',
            }]} >
            <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:30,
                fontWeight:'bold'
        
        }} >Questions</Text>
            <CustomList itemList={items} />
            <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/9653914309"
/>
        </View>
    )
};
export default posted;