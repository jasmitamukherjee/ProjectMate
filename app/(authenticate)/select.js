import { Pressable, StyleSheet, Text, View ,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage"
import "core-js/stable/atob";
import {jwtDecode} from "jwt-decode";

const select = () => {
  const [option, setOption] = useState("");
  const router = useRouter()
  const [userId,setUserId] = useState("");

  useEffect(()=>{
    const fetchUser= async ()=>{
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId)
    }
    fetchUser();


  },[])
  const updateUserGender = async () => {
    try{
        const response = await axios.put(`http://192.168.1.5:5000/users/${userId}/gender`,{
            gender:option
        });

        console.log(response.data);

        if(response.status == 200){
            router.replace("(tabs)/bio")
        }
    } catch(error){
        console.log("error",error)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
      <Pressable onPress={()=> setOption("male")} style={{
        
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "male" ? "#D0D0D0" : "transparent",
          borderWidth: option == "male" ? 1 : 0,
          
        }}>
        <Text style={{ fontFamily:"monospace",fontSize: 16, fontWeight: "700" }}>
          I am a Man.
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3233/3233508.png",
          }}
        />
      </Pressable>

      <Pressable onPress={()=> setOption("female")} style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "female" ? "#D0D0D0" : "transparent",
          borderWidth: option == "female" ? 1 : 0,
          
        }}>
        <Text style={{ fontFamily:"monospace",fontSize: 16, fontWeight: "700" }}>
          I am a woman.
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/256/1164/1164094.png",
          }}
        />
      </Pressable>

      <Pressable onPress={()=> setOption("nonbinary")} style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "nonbinary" ? "#D0D0D0" : "transparent",
          borderWidth: option == "nonbinary" ? 1 : 0,
          
        }}>
        <Text style={{ fontFamily:"monospace",fontSize: 16, fontWeight: "700" }}>
          I am non-binary.
        </Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/7326/7326569.png",
          }}
        />
      </Pressable>
      {option && (
        <Pressable
        onPress={updateUserGender}
          style={{
            marginTop: 25,
            backgroundColor: "black",
            padding: 15,
            borderRadius: 4,
          }}
        >
          <Text
            style={{fontFamily:"monospace", textAlign: "center", color: "white", fontWeight: "600",fontSize:16 }}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  )
}

export default select

const styles = StyleSheet.create({})