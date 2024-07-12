import { Pressable, StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import "core-js/stable/atob";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import config from '../../../config'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import UserChat from '../../../components/UserChat';
const index = () => {
  const router = useRouter()
  const [userId,setUserId] = useState("")
  const [profiles,setProfiles] = useState([])
  const [matches,setMatches] = useState([])
  useEffect(()=>{
    const fetchUser= async ()=>{
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    }
    fetchUser();


  },[]);

  const fetchReceivedLikesDetails= async ()=>{
    try {
      const response = await axios.get(
        `${config.BASE_URL}/received-likes/${userId}/details`
      );

      console.log(response);

      const receivedLikesDetails = response.data.receivedLikesDetails;

      setProfiles(receivedLikesDetails);
    } catch (error) {
      console.log("error fetching the details", error);
    }
  }
  const fetchUserMatches = async ()=>{
    try {
      const response = await axios.get(
        `${config.BASE_URL}/users/${userId}/matches`
      );

      const userMatches = response.data.matches;

      setMatches(userMatches);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(()=>{
    if(userId){
      fetchReceivedLikesDetails();
    }
  },[userId])
  useEffect(()=>{
    if(userId){
      fetchUserMatches()
    }
  },[userId])
  useFocusEffect(
    useCallback(()=>{
      if(userId) {
        fetchUserMatches()
      }
    },[])
  )
  const handleNavigateToSelect = () => {
    router.push({
      pathname: "/chat/select",
      params: {
        profiles: JSON.stringify(profiles),
        userId: userId,
      },
    });
  };
console.log("userid from index of chat",userId)
  console.log("matches",matches)
   return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 10 }}>

      <View  style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Text style={{fontFamily:"monospace",fontSize: 20, fontWeight: "bold"}}>CHATS</Text>
        <Ionicons name="chatbubbles" size={25} color="black" />
      </View>
      <Pressable 
       onPress={handleNavigateToSelect
      }
      style={{
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <View  style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignItems: "center",
          }}>
        <AntDesign name="like1" size={27} color="black" />            

        </View>
        <Text style={{fontFamily:"monospace", fontSize: 17, marginLeft: 10, flex: 1 }}>You have got {profiles.length} likes..</Text>
        <Entypo name="chevron-right" size={24} color="black" />
      </Pressable>
      <View>
        {matches?.map((item,index)=>(
          <UserChat key={index} userId={userId} item={item}/>
        ))}
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})