import { StyleSheet, Text, View,SafeAreaView,Image, KeyboardAvoidingView ,TextInput, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try {
        const token= await AsyncStorage.getItem("auth")
        if(token){
          router.replace("(tabs)/profile")
        }
        
      } catch (error) {
        console.log("Error",error)
        
      }
    }
checkLoginStatus()
  },[])
  const handleLogin=()=>{
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://192.168.1.3:5000/login",user).then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("auth",token);
        router.replace("/(authenticate)/select")
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ height: 200, backgroundColor: "#c6a5d1", width: "100%" ,borderBottomRightRadius: 150,borderBottomLeftRadius:150}}>
        <View  style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}>
          <Image style={{ width: 150, height: 80, resizeMode: "contain" }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2024/2024101.png",
            }}/>
        </View>
        <Text  style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 20,
            fontWeight:"bold",
            fontFamily: "monospace",
          }}>Project Mate</Text>
      </View>   
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text   style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 25,
              color: "#6a0a7d",
              fontFamily:"monospace"
            }}>Login to your Account</Text>
        </View>
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }} >

<Image
            style={{ width: 150, height: 100, resizeMode: "cover" }}
            source={{
              uri: "https://cdn-icons-png.freepik.com/512/7910/7910833.png",
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View   style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#c6a5d1",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>

  <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="white"
            />
             <TextInput
             
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              style={{
                color: "white",
                marginVertical: 10,
                width: 300,
                fontFamily:"monospace",
                fontSize: email? 17:17

                
              }}
            />


          </View>
          <View style={{}}>
            <View  style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#c6a5d1",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}>
            <AntDesign
                style={{ marginLeft: 8 }}
                name="lock1"
                size={24}
                color="white"
              />
               <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter your password"
                style={{
                  color: "white",
                  marginVertical: 10,
                  width: 300,
                  fontFamily:"monospace",
                  fontSize: password? 17:17
                }}
                placeholderTextColor="white"
              />
            </View>
         
          </View>
          <View  style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text style={{fontFamily:"monospace",}}>Keep me logged in</Text>
            <Text style={{ fontFamily:"monospace",color: "gray", fontWeight: "bold" }}>Forgot password</Text>

          </View>
          <View style={{marginTop:50,alignItems:'center'}}>
          <Pressable onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#c6a5d1",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}>
            <Text style={{
              fontFamily:"monospace",
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}>Login</Text>
          </Pressable>
          <Pressable style={{ marginTop: 12 }} onPress={()=> router.replace("/register")}>
            <Text style={{ fontWeight:"bold",textAlign: "center", color: "gray", fontSize: 16,fontFamily:"monospace" }}>Don't have an account? Sign Up</Text>
          </Pressable>

          </View>
         
        </View>
        
        </KeyboardAvoidingView> 
  </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({})