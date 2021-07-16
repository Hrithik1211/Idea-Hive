import React , {useState,useEffect} from 'react';
import {View,Text,Image,ActivityIndicator, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Input from '../elements/Input'
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './style'
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
export default function check({navigation}) {
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

    const [username,setusername] =useState('Username');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: 'VI', value: 'VI'},
    {label: 'VII', value: 'VII'},
    {label: 'VIII', value: 'VIII'},
    {label: 'IX', value: 'IX'},
    {label: 'X', value: 'X'},
    {label: 'XI', value: 'XI'},
    {label: 'XII', value: 'XII'},
    {label: 'XII+', value: 'XII+'},
  ]);
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
  var [errorusername,seterrorusername] =useState(null);
  const submit=()=>{
    setUploading(true)
      database().ref('/username/'+username+'/').
      once('value')
      .then(snapshot=>{
          if(snapshot.val()){
              seterrorusername('Username already exists')
          }
          else{
    auth().currentUser.updateProfile({
        displayName:username,
        photoURL:url,
        class:value,
    }).then(()=>{navigation.navigate('Login');
  })
    database().ref('/username/'+username+'/')
    .set({username,class:value,image:url,groups:{Feedback:'Feedback'}});
    // navigation.navigate('Login');
          }
      })
  }
    return (
        <View style={styles.details} >
            <TouchableOpacity onPress={selectImageLibrary} style={styles.touchimage} >
                <Image style={styles.image} source={{uri:imageSource}} />
            </TouchableOpacity>
            <Text style={{padding:10,color:'white',textAlign:'center',fontWeight:'bold'}} >Select Image</Text>
            <Input placeholder="Username" onChangeText={setusername} returnKeyType='next' error={errorusername} />
            <Input placeholder="Enter Your Name" onChangeText={setValue} returnKeyType='next' />
      
    <TouchableOpacity style={[styles.signup,{flexDirection:'row',justifyContent:'center'}] } disabled={uploading} onPress={submit}  >
       { uploading&& <ActivityIndicator color='brown' />}
        <Text>Sign Up</Text></TouchableOpacity>
    </View>
   
    )
}
