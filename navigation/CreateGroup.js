import React ,{useState,useEffect} from 'react'
import {Text,TouchableOpacity,ActivityIndicator,Image,View} from 'react-native'
import styles from './style'
import database from '@react-native-firebase/database'
import Input from '../elements/Input'
import auth from '@react-native-firebase/auth'
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
export default function CreateGroup({navigation}) {
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
      
      };
    const user = auth().currentUser
    const [name,setname] = useState('')
    var [errorusername,seterrorusername] =useState(null);
    function create(){
        if(name.length){
            console.log(name)
            database().ref('/groups/'+name+'/')
            .once('value').then(
                snapshot=>{
                    if(snapshot.val()){
                        seterrorusername('Group Name already exists')
                    }
                    else{
                        database().ref('/groups/'+name+'/').
                        set({
                            name:name,
                            postedat:user.displayName,
                            sec:sec,
                            profile:url,
                        })
                        database().ref('/username/'+user.displayName+'/groups/'+name)
                        .set(name)
                        navigation.replace('Login')
                    }
                }
            )
        }
    }
    const [sec,setsec] = useState('Open')
    return (
        <View style={[styles.wrapper,{justifyContent:'space-between'}]} >
                  
                  <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/4124996276"
/>
<View>
<TouchableOpacity onPress={selectImageLibrary} style={styles.touchimage} >
                <Image style={styles.image} source={{uri:imageSource}} />
            </TouchableOpacity>
            <Text style={{padding:10,color:'white',textAlign:'center',fontWeight:'bold'}} >Select Image</Text>
            <View style={{padding:10}} >
                <Input maxLength={20} placeholder="Enter Group Name" onChangeText={setname} error={errorusername} />
                <View style={{flexDirection:'row',padding:10,justifyContent:'space-evenly'}} >
                    <Text onPress={()=>{setsec('Open')}} style={{ padding:10, backgroundColor:sec=='Open'?'#FFC300':'#D5DBDB',borderRadius:10}} >Open</Text>
                    <Text onPress={()=>{setsec('Private')}} style={{ padding:10, backgroundColor:sec=='Private'?'#FFC300':'#D5DBDB',borderRadius:10}} >Private</Text>
                </View>
                <TouchableOpacity disabled={uploading} onPress={()=>{create()}} style={[styles.signup,{justifyContent:'center',flexDirection:'row'}]} >{uploading&&<ActivityIndicator color="brown" />}<Text>Create Group</Text></TouchableOpacity>
            </View>
</View>
<AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/9653914309"
/>
        </View>
    )
}
