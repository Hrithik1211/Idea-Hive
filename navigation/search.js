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
export default function search({navigation,route}) {
    const user = auth().currentUser
    const {item} = route.params
    const [items,setitems] =useState([]);
    const [search,setsearch] =useState('');
    if(search.length>0){
        database().ref('/groups/').
        once('value').then(snapshot=>{
            var itemq=[];
            var itemsq=snapshot.val();
            for(var key in itemsq){
                if(key.toString().startsWith(search)){
                    itemsq[key].display='groups';
                    if(item){
                        if(key in item){
                            continue;
                        }
                        else{
                            itemsq[key].join="join"
                        }
                    }
                    else{
                        itemsq[key].join="join"
                    }
                    itemsq[key].search="search"
                    itemq.push(itemsq[key])
                }
            }
            if(items.length!=itemq.length)
            setitems(itemq)
        })
    }
    else{
        if(items.length){
            setitems([])
        }
    }
    console.log(items)
    return (
        <View style={[styles.wrapper]} >
            <View style={{padding:10}} >
            <TextInput style={styles.groupsearch} placeholder="Search Group" onChangeText={setsearch} />
            </View>
            <CustomList itemList={items} />
            <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/6405768583"
/>
        </View>
    )
}
