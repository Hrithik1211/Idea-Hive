import React , {useState,useEffect} from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import CustomList from '../elements/CustomList';
import database from '@react-native-firebase/database'
import styles from './style'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
const solution=({route,items})=>{
    const [loading, setLoading] = useState(true); 
    const [item, setitem] = useState([]); 
    const {title} = route.params;
    useEffect(()=>{
        database().ref('/solutions/'+title+'/')
    .on('value',snapshot=>{
        setitem([]);
        var items=[]
        const val = snapshot.val();
        for(var key in val){
            val[key].quest=key;
            val[key].solution=title;
            items.push(val[key]);
        }
        setitem(items);
        console.log(items)
        setLoading(false);
    })
    },[])

    if (loading) {
      return (
          <View style={[styles.wrapper,{justifyContent:'center'}]} >
              <ActivityIndicator color='pink' />
          </View>
      ) 
    }
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
        
        }} >Solution</Text>
            <CustomList itemList={item} />
            <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/9653914309"
/>
        </View>
    )
};
export default solution;