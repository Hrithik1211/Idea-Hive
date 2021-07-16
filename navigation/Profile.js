import { useNavigation } from '@react-navigation/native';
import React ,{useState} from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native';
import auth from '@react-native-firebase/auth'
import styles from './style'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'react-native-image-picker'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
export default function Profile({route,navigation}) {
    const {username} = route.params;
    const {navigate} = useNavigation();
    const [clas,setclas] = useState({})
    const user = auth().currentUser; 
    const [load,setload] = useState(true)
    if(load)
    database().ref('/username/'+username+'/')
    .once('value').then(snapshot=>{
        setclas(snapshot.val())
        setImageSource(snapshot.val().image)
        setload(false)
    })
    const [imageSource, setImageSource] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    function selectImageLibrary() {
        console.log('image')
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
            uploadImage(source)
            setImageSource(source)
        }
      });
    }
    const uploadImage = async (imagesource) => {
          const  uri  = imagesource;
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
          console.log('uploaded')
          const url = await storage().ref(filename).getDownloadURL();
          var date=new Date();
          var postedat= date.getHours()+":"+date.getMinutes()+" on "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
          
  database()
  .ref('/username/'+user.displayName+'/image')
  .set(url
   )
   user.updateProfile({
       photoURL:url
   })
    };

    return (
        <View style={styles.wrapper}>
            <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:30,
                fontWeight:'bold'
        
        }} >Profile</Text><TouchableOpacity style={styles.image} onPress={()=>{selectImageLibrary()}} >
                <Image style={[styles.image,{borderWidth:2,borderColor:'#F4D03F'}]} source={{uri:imageSource}  } />
            </TouchableOpacity>
            <Text onPress={()=>{console.log(navigation);navigation.pop();navigation.navigate('Login')}} style={{
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
        {username==user.displayName&&    <TouchableOpacity style={{backgroundColor:'pink',padding:10,alignItems:'center',margin:10,borderRadius:10}}
            onPress={()=>{auth().signOut();navigate('details') }}
            ><Text>SignOut</Text></TouchableOpacity>
        }
        <View style={{marginTop:'auto'}} >
        <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/4124996276"
  onAdFailedToLoad={error => console.error(error)}
/>
        </View>
        </View>
    )
}
