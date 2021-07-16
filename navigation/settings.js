import React ,{useState,useEffect} from 'react'
import {Text,TouchableOpacity,ActivityIndicator,Image,View} from 'react-native'
import styles from './style'
import database from '@react-native-firebase/database'
import Input from '../elements/Input'
import auth from '@react-native-firebase/auth'
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import CustomList from '../elements/CustomList'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
export default function settings({navigation,route}) {
    const {groupname,group} = route.params
    const [imageSource, setImageSource] = React.useState('https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg');
    const [uploading, setUploading] = React.useState(false);
    const [url,seturl] =useState(imageSource);
    function selectImageLibrary() {
      let options = {
        title: 'You can choose one image',
        maxWidth: 1920,
        maxHeight: 1080,
        storageOptions: {
        skipBackup: true
        }
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = response.assets[0].uri;
            setImageSource(source);
            uploadImage(source)
        }
      });
    }
    const uploadImage = async (source) => {
        const  uri  = source;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        const task = storage()
          .ref(filename)
          .putFile(uploadUri);
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        setUploading(false);
        const url = await storage().ref(filename).getDownloadURL();
        seturl(url);
        database().ref('/groups/'+groupsname+'/profile/').set(imageSource)
      
      };
    const user = auth().currentUser
    const [name,setname] = useState('')
    var [errorusername,seterrorusername] =useState(null);
    function create(){
        if(name.length){
            database().ref('/username/'+name+'/')
            .once('value').then(
                snapshot=>{
                    if(snapshot.val()){
                        database().ref('/username/'+name+'/groups/'+groupname).set(groupname)
                        database().ref('/groups/'+groupname+'/members/'+name).set(snapshot.val().image)
                        seterrorusername(null)
                        setmemberlist([])
                    }
                    else{
                        seterrorusername('User Does not exists')
                    }
                }
            )
        }
    }
    const [list,setlist] = useState([])
        database().ref('/groups/'+groupname+'/requests')
        .once('value').then(snapshot=>{
            var listitem=[]
            var itemq=snapshot.val();
            for(var key in itemq){
                listitem.push({username:key,display:'requests',name:groupname,image:itemq[key]})
            }
            if(listitem.length!=list.length)
            setlist(listitem)
        })
    const [memberlist,setmemberlist] = useState([]);
        database().ref('/groups/'+groupname+'/members/')
        .once('value').then(snapshot=>{
            var val=snapshot.val();
            var list=[]
            for(var key in val){
                if(user.displayName==group)
                list.push({username:key,display:'members',image:val[key],name:'sec',quest:groupname});
                else
                list.push({username:key,display:'members',image:val[key],quest:groupname});

            }
            if(list.length!=memberlist.length)
            setmemberlist(list)
        })
    const [sec,setsec] = useState('Open')
    const [page,setpage] = useState('Member');
    return (
        <View style={[styles.wrapper]} >
            <TouchableOpacity disabled={group!=user.displayName} onPress={selectImageLibrary} style={styles.touchimage} >
                <Image style={styles.image} source={{uri:imageSource}} />
            </TouchableOpacity>
            <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly'}} >
                    <Text onPress={()=>{setpage('Member')}} style={{ padding:10, backgroundColor:page=='Member'?'#FFC300':'#D5DBDB',borderRadius:10}} >Member</Text>
                    {group==user.displayName&&<Text onPress={()=>{setpage('Requests')}} style={{ padding:10, backgroundColor:page=='Requests'?'#FFC300':'#D5DBDB',borderRadius:10}} >Requests</Text>
                    }
                    {group==user.displayName&&    <Text onPress={()=>{setpage('delete')}} style={{ padding:10, backgroundColor:'#D5DBDB',borderRadius:10}} >Delete Group</Text>
            }
                {group!=user.displayName&&    <Text onPress={()=>{setpage('delete')}} style={{ padding:10, backgroundColor:'#D5DBDB',borderRadius:10}} >Leave Group</Text>
            }
                
                </View>
            {page=="Member"?<View style={{padding:10}} >
                {group==user.displayName&&<View><Input placeholder="Enter Username" onChangeText={setname} error={errorusername} />
                <TouchableOpacity disabled={uploading} onPress={()=>{create()}} style={[styles.signupbutton,{justifyContent:'center',flexDirection:'row'}]} ><Text>Add</Text></TouchableOpacity>
                
                    </View>
                }
            </View>:
            <View>
            </View>
            }
            {page=='delete'&&<TouchableOpacity disabled={uploading} onPress={()=>{
                    database().ref('/username/'+user.displayName+'/groups/'+groupname).remove();
                    if(group==user.displayName){
                        database().ref('/questions/'+groupname).remove();
                        
                    database().ref('/groups/'+groupname).remove();
                    }
                    else{
                        database().ref('/groups/'+groupname+'/members/'+user.displayName).remove();    
                    }
                    navigation.replace('Login')
                
            }} style={[styles.signup,{justifyContent:'center',flexDirection:'row'}]} >
                {group==user.displayName&&<Text>Delete Group</Text>}
                {group!=user.displayName&&<Text>Leave Group</Text>}
                </TouchableOpacity>
            }
            {page=='Member'&&            <CustomList itemList={memberlist} />
}
{page=='Requests'&&                <CustomList itemList={list} />
}
<AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/8161208541"
  onAdFailedToLoad={error => console.error(error)}
/>
        </View>
    )
}
