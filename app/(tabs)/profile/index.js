import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import "core-js/stable/atob";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { FlatList } from 'react-native';
import Profile from "../../../components/Profile"
const index = () => {
  const [userId, setUserId] = useState("")
  const [user,setUser] = useState("")
  const [profiles,setProfiles] = useState([])
  useEffect(()=>{
    const fetchUser= async ()=>{
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    }
    fetchUser();


  },[])
  const fetchUserDescription= async ()=>{
    try { const response = await axios.get(`http://192.168.1.3:5000/users/${userId}`);
    console.log(response);
    const user = response.data;

    // setDescription(user?.user?.description);
    // setSelectedKeywords(user.user?.keywords);
    // setImages(user?.user.projectImages);
    // setLookingOptions(user?.user.lookingFor)
    setUser(user?.user)

      
    } catch (error) {
      console.log("Error finding user description",error)
      
    }
  }  
  const fetchPofiles =  async ()=>{
    try {
      const response = await axios.get("http://192.168.1.3:5000/profiles", {
        params: {
          userId: userId,
          gender: user?.gender,
          keywords: user?.keywords,
          lookingFor: user?.lookingFor,
        },
      });

      setProfiles(response.data.profiles);
    } catch (error) {
      console.log("error fetching profiles ", error);
    }
  };
  
  useEffect(()=>{
    if(userId){
      fetchUserDescription()
    }
  
  },[userId])
useEffect(()=>{
  if(userId && user){
    fetchPofiles()
  }
},[userId,user])
// console.log("Profiles",profiles)
  return (
    <View style={{ flex: 1,padding:13 }}>
 <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Profile
            key={index}
            item={item}
            userId={userId}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
          
        )}
      />    
      </View>
  )
}

export default index

const styles = StyleSheet.create({})