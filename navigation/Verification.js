import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNav from './BottomNav';
import Quest from './Quest';
import Upload from './Upload';
import Solution from './solution';
import Image from './image'
import details from './details';
import check from './check';
import Questions from '../elements/Input/Questions';
import bmk from './bmk';
import posted from './posted';
import auth from '@react-native-firebase/auth'
import view from './view';
import CreateGroup from './CreateGroup';
import settings from './settings';
import search from './search'
const Verification=()=>{
    const user = auth().currentUser;
    const VerificationStack = createStackNavigator();
    return(
        <VerificationStack.Navigator headerMode='none' >
            {!user&&<VerificationStack.Screen name={'details'} component={details}></VerificationStack.Screen>}
            {(!user||(user&&user.displayName==null)) &&<VerificationStack.Screen name={'check'} component={check}></VerificationStack.Screen>        }
            <VerificationStack.Screen name={'Login'} component={BottomNav}></VerificationStack.Screen>
            {user&&<VerificationStack.Screen name={'details'} component={details}></VerificationStack.Screen>}
            {!(!user||(user&&user.displayName==null)) &&<VerificationStack.Screen name={'check'} component={check}></VerificationStack.Screen>        }
            <VerificationStack.Screen name={'search'} component={search}></VerificationStack.Screen>
            <VerificationStack.Screen name={'posted'} component={posted}></VerificationStack.Screen>
            <VerificationStack.Screen name={'view'} component={view}></VerificationStack.Screen>
            <VerificationStack.Screen name={'settings'} component={settings}></VerificationStack.Screen>
            <VerificationStack.Screen name={'CreateGroup'} component={CreateGroup}></VerificationStack.Screen>
            <VerificationStack.Screen name={'Quest'} component={Quest}></VerificationStack.Screen>        
            <VerificationStack.Screen name={'bmk'} component={bmk}></VerificationStack.Screen>        
            <VerificationStack.Screen name={'Upload'} component={Upload}></VerificationStack.Screen>        
            <VerificationStack.Screen name={'Questions'} component={Questions}></VerificationStack.Screen>        
            <VerificationStack.Screen name={'Solution'} component={Solution}></VerificationStack.Screen>        
            <VerificationStack.Screen name={'Image'} component={Image}></VerificationStack.Screen>        
        </VerificationStack.Navigator>
    );
};
export default Verification;
       