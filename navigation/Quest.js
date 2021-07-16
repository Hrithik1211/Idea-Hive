import React ,{useState} from 'react';
import {View,Text,Alert,Image,ActivityIndicator,TouchableOpacity,TextInput} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import * as ImagePicker from 'react-native-image-picker';
import styles from './style';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
const Quest=({navigation,route})=>{
  const user=auth().currentUser;
    const {subject} = route.params;
    const [imageSource, setImageSource] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [transferred, setTransferred] = React.useState(0);
    const[comment,setcomment]=useState('')
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
          setImageSource(source);
        }
      });
    }
 
    function selectImage() {
      let options = {
        title: 'You can choose one image',
        maxWidth: 1920,
        maxHeight: 1080,
        storageOptions: {
        skipBackup: true
        }
      };
  
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = response.assets[0].uri;
          setImageSource(source);
        }
      });
    }
    const uploadImage = async () => {
      if(imageSource==null){
        if(comment.length){
          navigation.replace('Questions',{groupname:subject});
          var date=new Date();
          var postedat= date.getHours()+":"+date.getMinutes()+" on "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
          
  database()
  .ref('/questions/'+subject+'/'+date.getTime())
  .set({
    name: user.displayName ,
    image: null,
    postedat: postedat,
    text:comment,
  })
  
database()
.ref('/username/'+user.displayName+'/questions/'+date.getTime())
.set({
  name: user.displayName ,
  image: null,
  postedat: postedat,
  text:comment,
  subject
}).then(console.log('quest'))
       
        }
      }
       else {const  uri  = imageSource;
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
        navigation.replace('Questions',{groupname:subject});
        var date=new Date();
        var postedat= date.getHours()+":"+date.getMinutes()+" on "+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
        if(comment.length>0){
          database()
.ref('/questions/'+subject+'/'+date.getTime())
.set({
  name: user.displayName ,
  image: url,
  postedat: postedat,
  text:comment
})
database()
.ref('/username/'+user.displayName+'/questions/'+date.getTime())
.set({
  name: user.displayName ,
  image: url,
  postedat: postedat,
  text:comment,
  subject
})

        }
        else{
          database()
          .ref('/questions/'+subject+'/'+date.getTime())
          .set({
            name: user.displayName ,
            image: url,
            postedat: postedat,
          })
          
database()
.ref('/username/'+user.displayName+'/questions/'+date.getTime())
.set({
  name: user.displayName ,
  image: url,
  postedat: postedat,
  subject
})
                    
        }     
        }
         AdMobInterstitial.setAdUnitID('ca-app-pub-6029736109689866/8982996311');
     AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    
      };
      console.log(comment)
    return(
        <View style={[styles.wrapper,{justifyContent:'space-between'}]} >
                      <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/8161208541"
/>
          <View>
          <Text style={{
                color:'#F9E79F',
                textAlign:'center',
                backgroundColor:'#34495E',
                padding:5,
                fontSize:30,
                fontWeight:'bold'
        
        }} >{subject}</Text>
            <View style={{padding:10}} >
              <TextInput onChangeText={setcomment} style={styles.textinput} multiline={true} placeholder="Type Something" />
            </View>
            <View style={{padding:10,flexDirection:'row',justifyContent:'space-evenly'}}>
              <Text style={{paddingHorizontal:10,color:'white'}} >Attach Image </Text>
              <Icon name='camera'onPress={()=>{selectImage()}} style={{paddingHorizontal:10}} color='#F9E79F' />
              <Icon name='photo-album' onPress={()=>{selectImageLibrary()}} style={{paddingHorizontal:10}} color='#F9E79F'/>
              {imageSource&&<Icon name='close' color='#F9E79F' onPress={()=>{setImageSource(null)}} />}
            </View>
            {imageSource&&<Image style={{height:400}} source={{uri:imageSource}} resizeMode="stretch" />}
            <TouchableOpacity disabled={uploading} style={{alignItems:'center',padding:10,flexWrap:'nowrap',flexDirection:'row',justifyContent:'center',backgroundColor:'pink',marginTop:10,borderRadius:10,margin:10}} onPress={uploadImage} >
                {uploading&&<ActivityIndicator color='brown' />}
                <Text>Upload</Text>
            </TouchableOpacity>
          </View>
          <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-6029736109689866/9653914309"
/>
        </View>
    );
};
export default Quest;