import React ,{useState} from 'react';
import {FlatList,View,Text} from 'react-native';
import ListItem from './item';
const List=({itemList})=>{
    const [load,setload]=useState(null)
    if(!load){
        if(itemList.length){
            setload(itemList)
        }
    }
    function clist(id){
        let arr = itemList.filter(function(item) {
            console.log(item.username,id)
            return item.username !== id
          })
          itemList=arr
          setload(arr)
        };
    return(
        <FlatList data={load} renderItem={({item})=><ListItem clist={clist} sec={item.sec} search={item.join} name={item.name} image={item.image} quest={item.quest} postedat={item.postedat} profileimage={item.profile} comment={item.text} display={item.display} solution={item.solution} subject={item.subject} navigation={item.navigation} username={item.username} />
        } keyExtractor={(item,index)=>index.toString()}  />
    );
};
export default List;