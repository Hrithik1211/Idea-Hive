import React ,{useState,useEffect} from 'react';
import {View,Text,Image,ActivityIndicator} from 'react-native';
import CustomList from '../CustomList';
import styles from '../../navigation/style'
import database from '@react-native-firebase/database'
import { FloatingAction } from 'react-native-floating-action';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import IconBadge from 'react-native-icon-badge';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
const Questions=({items,route,navigation})=>{
        const user = auth().currentUser
        const {groupname,createdby,image} = route.params
        const [loading, setLoading] = useState(true); // Set loading to true on component mount
        const [badge, setbadge] = useState(true); // Set loading to true on component mount
        const [item, setitem] = useState([]); // Initial empty array of users
        useEffect(()=>{
            var items=[]
            database().ref('/groups/'+groupname+'/requests/')
            .once('value').then(snapshot=>{
                if((snapshot.val()!=null)&&badge){
                    setbadge(false)
                }
            })
            database().ref('/questions/'+groupname+'/')
        .on('value',snapshot=>{
            setitem([]);
            const val = snapshot.val();
            for(var key in val){
                val[key].quest=key;
                val[key].display="question"
                val[key].subject=groupname
                items.push(val[key]);
            }
            setitem(items);
            items.sort(function(j,k){return k.quest-j.quest})
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
                    <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                    <View style={{padding:10}} >
                    <Image style={{padding:10,height:40,width:40,borderRadius:20}} source={{uri:image}} />
                    </View>
                    
                    <Text style={{
                    color:'#F9E79F',
                    backgroundColor:'#34495E',
                    padding:5,
                    fontSize:20,
                    alignSelf:'center',
            }} >{groupname}</Text>
            <View style={{justifyContent:'center'}}>
            <View style={{padding:10}} >
            <IconBadge
    MainElement={
        <Icon size={30} onPress={()=>{navigation.navigate('settings',{groupname:groupname,group:createdby})}} style={{backgroundColor:'#F9E79F',justifyContent:'center',padding:10,borderRadius:10}} name='settings' color="#FFC300" />
    }
    IconBadgeStyle={ {
        position:'absolute',
        top:-5,
        right:-5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000'
      }}
      Hidden={badge}
    />
            
            </View>
            </View> 
                    </View>
                <CustomList itemList={item} />
                <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/6405768583"
/>
                <FloatingAction actions={[{icon:<Icon name='add' color="#ffff" />,name:'question',title:'Question'}]}
       onPressItem={name=>{
           
           navigation.replace('Quest',{subject:groupname});
       }} />
            </View>
        )
};
export default Questions;