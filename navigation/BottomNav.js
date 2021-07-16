import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements'
import Profile from './Profile';
import auth from '@react-native-firebase/auth'
import Groups from './Groups';
import Tools from './Tools';
const BottomNav=({navigation})=>{
    const user=auth().currentUser
    const Bottomnav=createBottomTabNavigator();
    return(
        <Bottomnav.Navigator>
            <Bottomnav.Screen name="Groups" component={Groups} options={{tabBarIcon:({color,size})=>(<Icon name='group' color='#517fa4' />            )}} />
            <Bottomnav.Screen name="Profile" initialParams={{username:user.displayName}} component={Profile} options={{tabBarIcon:({color,size})=>(<Icon name='account-circle' color='#517fa4' />            )}} />
        </Bottomnav.Navigator>
    );
};
//<Bottomnav.Screen name="Tools" component={Tools} options={{tabBarIcon:({color,size})=>(<Icon name='settings' color='#517fa4' />            )}} />
export default BottomNav;