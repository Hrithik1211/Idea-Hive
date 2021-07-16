import React ,{useState} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import styles from './style'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { Icon } from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';
const item=({name,image,quest,postedat,comment,clist,navigation,sec,display,solution,username,search,subject,profileimage})=>{
    const user=auth().currentUser
    const [profile,setprofile]=useState(null);
    const {navigate,replace} = useNavigation();
    const[bcolor,setbcolor]=useState('white');
    database().ref('/username/'+name+'/image/')
    .once('value')
    .then(snapshot=>{
        setprofile(snapshot.val())
    })
    database().ref('/username/'+user.displayName+'/bookmark/'+quest+'/')
    .once('value').then(snapshot=>{
        if(snapshot.val()){
            setbcolor('pink')
        }
        else{
            setbcolor('white')
        }
    })
    const ondelete=()=>{
        database().ref('/solutions/'+solution+'/'+quest).remove();
    }
    const onclicklike= async ()=>{
        if(bcolor=="white"){
            setbcolor('pink')
        }
        else{
            setbcolor('white')
        }
        database().ref('/username/'+user.displayName+'/bookmark/'+quest+'/')
        .once('value')
        .then(snapshot=>{
            if(snapshot.val()){
                database().ref('/username/'+user.displayName+'/bookmark/'+quest+'/').remove();
                setbcolor('white')
            }
            else{
                database().ref('/username/'+user.displayName+'/bookmark/'+quest+'/')
                .set({
                    name,
                    image,
                    postedat,
                    text:comment
                })
            }
        })
    }
    const onclickanswer=()=>{
        replace('Upload',{subject:subject,quest:quest});
    }
    const onclicksolution=()=>{
        navigate('Solution',{title:quest})
    }
    const ondeletepost=()=>{
        database().ref('/questions/'+subject+'/'+quest).remove();
        database().ref('/username/'+user.displayName+'/questions/'+quest).remove();
    }
    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color:'blue'}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
     
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color:'blue'}} onPress={handlePress}>
            Show less
          </Text>
        );
      }
     
      _handleTextReady = () => {
        // ...
      }

      if(display=='requests'){
        return(
                <View style={{paddingBottom:10,
                backgroundColor:'#34495E',}} onPress={()=>{console.log('button')}} >
                <View style={[styles.view,{flexDirection:'row',justifyContent:'space-between'}]} >
                <View style={{flexDirection:'row',padding:10,justifyContent:'space-between'  }} >
                    <Image style={{height:40,width:40,borderRadius:20}} source={{uri:image}} />
                    <View style={{justifyContent:'center'}} >
                        <Text style={styles.text} >{username}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',padding:10}} >
                    <View style={{justifyContent:'center',paddingHorizontal:10}} >
                    <Icon  name="approval" color="green" style={{padding:10}} onPress={()=>{
                        database().ref('/groups/'+name+'/members/'+username).set(image)
                        database().ref('/username/'+username+'/groups/'+name).set(name);
                        database().ref('/groups/'+name+'/requests/'+username).remove();
                        clist(username)
                    }} />
                    </View>
                    <View style={{justifyContent:'center',paddingHorizontal:10}} >
                        <Icon name="cancel" color="red" style={{alignItems:'center'}} onPress={()=>{    database().ref('/groups/'+name+'/requests/'+username).remove();
                        clist(username)
                   }} />
                   
                    </View>
                    </View>
                <View>
                </View>         
            </View>
                </View>   
        );
        
      }
      if(display=='members'){
        return(
        <View style={{paddingBottom:10,
                backgroundColor:'#34495E',}} onPress={()=>{console.log('button')}} >
                <View style={[styles.view,{flexDirection:'row',justifyContent:'space-between'}]} >
                <View style={{flexDirection:'row',padding:10 }} >
                    <Image style={{height:40,width:40,borderRadius:20}} source={{uri:image}} />
                    <View style={{justifyContent:'center'}} >
                        <Text style={styles.text} >{username}</Text>
                    </View>
                </View>
                {name&&username!=user.displayName&&<View style={{padding:10,justifyContent:'center',alignContent:'flex-end',marginLeft:'auto'}} >
                    <Icon name='cancel' color='red' onPress={()=>{
                        database().ref('/groups/'+quest+'/members/'+username).remove();
                        database().ref('/username/'+username+'/groups/'+quest).remove();
                        clist(username)
                    }} />
                </View>}
                
                <View>
                </View>         
            </View>
                </View>
                
        );    

      }
      if(display=='groups'){
          const[join,setjoin]=useState(search)
          function clickjoin(){
              if(join=="Requested"){
                database().ref('/groups/'+name+'/requests/'+user.displayName).remove()
                setjoin('join');
              }
              else if(join=="joined"){
                  database().ref('/username/'+user.displayName+'/groups/'+name).remove();
                  database().ref('/groups/'+name+'/members/'+user.displayName).remove()
                  setjoin('join')
              }
              else{
                  if(sec=='Private'){
                      setjoin('Requested')
                      database().ref('/groups/'+name+'/requests/'+user.displayName).set(user.photoURL)
                  }
                  else{
                      database().ref('/username/'+user.displayName+'/groups/'+name).set(name);
                      database().ref('/groups/'+name+'/members/'+user.displayName).set(user.photoURL)
                      setjoin('joined')
                      replace('Login')
                  }
              }
          }
    return(
        <TouchableOpacity disabled={search} onPress={()=>{if(search){
        }else{
            navigate('Questions',{groupname:name,createdby:postedat,image:profileimage})
        }
        }} >
            <View style={{paddingBottom:10,
            backgroundColor:'#34495E',}} onPress={()=>{console.log('button')}} >
            <View style={[styles.view,{flexDirection:'row',justifyContent:'space-between'}]} >
            <View style={{flexDirection:'row',padding:10 }} >
                <Image style={{height:40,width:40,borderRadius:20}} source={{uri:profileimage}} />
                <View>
                    <Text style={styles.text} >{name}</Text>
                    <Text style={{fontSize:10,marginLeft:10,marginBottom:10}} >Created by {postedat} </Text>
                </View>
            </View>
            <View style={{padding:10,flexDirection:'row',flex:1,justifyContent:'flex-end'}} >
            {search&&<Text style={{padding:10,color:'black'}} >{sec}</Text>}
            {search&&<Text onPress={()=>{clickjoin()}} style={{
                    backgroundColor:join=="join"?'grey':'green',
                    color:'white',
                    padding:10,
                    borderRadius:10
                }} >{join}</Text> }
            </View>
            <View>
            </View>         
        </View>
            </View>
        </TouchableOpacity>
            
    );
      }
    return(
        <View style={{paddingBottom:10,
            backgroundColor:'#34495E',}} >
            <View style={styles.view} >
            <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#EBEDEF'}} >
                <Image style={{height:40,width:40,borderRadius:20}} source={{uri:profile}} />
                <View>
                    <Text style={styles.text} onPress={()=>{navigate('view',{username:name})}} >{name}</Text>
                    <Text style={{fontSize:10,marginLeft:10,marginBottom:10}} >Posted at {postedat} </Text>
                </View>
            </View>
            <View>
                
            {comment&&<View style={{paddingHorizontal:10}} ><ReadMore
              numberOfLines={1}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
              onReady={_handleTextReady}
              >
                  <Text style={styles.comment}>{comment}</Text>
            </ReadMore></View>}
            {image&& <TouchableOpacity onPress={()=>{navigate('Image',{url:image})}} style={{backgroundColor:'grey'}} activeOpacity={.7} >
            <Image style={styles.image} source={{uri:image}} resizeMode="stretch"  />    
            </TouchableOpacity>
           }
            
            </View>
            {display&&<View style={styles.wrapper}>
                <TouchableOpacity style={styles.buttons} onPress={onclickanswer} activeOpacity={.7}>
                    <Icon color="white" name="upload-file" style={{paddingHorizontal:2}} />
                    <Text style={{color:'white'}} >Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
            onPress={onclicksolution} activeOpacity={.7}
            >
                <Icon name='message' color="white" style={{paddingHorizontal:2}} />
            <Text style={{color:"white"}} >Solution</Text>
            </TouchableOpacity>
            {(display=='posted'&&name==user.displayName)&&<TouchableOpacity style={styles.buttons} onPress={ondeletepost} activeOpacity={.7}>
                    <Icon color="white" name="delete" style={{paddingHorizontal:2}} />
                </TouchableOpacity>}
                {display!='posted'&&<TouchableOpacity style={styles.buttons} onPress={onclicklike} activeOpacity={.7} >
                    <Icon name="bookmark" style={{paddingHorizontal:2}} color={bcolor}  />
                </TouchableOpacity>}               
            </View>}
            {!display&&<View style={styles.wrapper}>
                {name==user.displayName&&<TouchableOpacity style={styles.buttons} onPress={ondelete} activeOpacity={.7}>
                    <Icon color="white" name="delete" style={{paddingHorizontal:2}} />
                    <Text style={{color:'white'}} >Delete</Text>
                </TouchableOpacity>
 }
               
            </View>}            
        </View>
            </View>
            
    );
};
export default item;