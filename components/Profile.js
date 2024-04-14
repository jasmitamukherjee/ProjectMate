import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as Animatable from "react-native-animatable"
const Profile = ({ item, isEven, userId, setProfiles }) => {
  const colors = ["#F0F8FF", "#FFFFFF"];
  const [liked,setLiked] = useState(false);
  const [selected,setSelected] = useState(false )
  const handleLike= async (selectedUserId) => {
    try {

      setLiked(true);
      await axios.post("http://192.168.180.207:5000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setLiked(false);
      }, 200);
      
    } catch (error) {
      console.log("Error liking profile" ,error)
      
    }
  }
  const handleLikeOther= async (selectedUserId)=>{
    try {

      setSelected(true);
      await axios.post("http://192.168.180.207:5000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setSelected(false);
      }, 200);
      
    } catch (error) {
      console.log("Error liking profile" ,error)
      
    }

  }
  if(isEven){
    return(
      <View style={{ padding: 15, backgroundColor: "#eedff0",borderRadius:30 }}>
        <ScrollView  showsHorizontalScrollIndicator={false} horizontal>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text style={{fontFamily:"monospace",fontSize: 17, fontWeight: "bold"}}>{item?.name}
              </Text>
              <Text style={{
                  width: 200,
                  marginTop: 15,
                  fontSize: 16,
                  lineHeight: 24,
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}>Description : {item?.description}</Text>

            </View>
            {item?.projectImages?.slice(0,1).map((item,index) => (
              <Image key={index} style={{
                width: 280,
                height: 280,
                resizeMode: "cover",
                borderRadius: 5,
              }} source={{uri:item}}/>
            ))}
          </View>

        </ScrollView>
        <View>
          <View  style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}>
          <Entypo name="dots-three-vertical" size={26} color="black" />
          <View  style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable    style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
            <AntDesign name="star" size={26} color="black" />
            </Pressable>

             {liked ?(
              <Pressable  style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Animatable.View animation="swing" easing={"ease-in-out-circ"} iterationCount={1}>
                <AntDesign name="like1" size={27} color="white" />
                </Animatable.View>
              </Pressable>

             ):(
              <Pressable 
            onPress={()=> handleLike(item?._id)}
            style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
            <AntDesign name="like1" size={27} color="black" />            
            </Pressable>

             )}  
{/* 
            <Pressable 
            onPress={()=> handleLike(item?._id)}
            style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
            <AntDesign name="like1" size={27} color="black" />            
            </Pressable> */}

          </View>
          </View>
        </View>
<View style={{marginVertical:15}}/>
      </View>
    )
  }
  else{
    return(
      <View style={{ padding: 12, backgroundColor: "white",borderRadius:30 }}>
        <ScrollView  showsHorizontalScrollIndicator={false} horizontal>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
            
            {item?.projectImages?.slice(0,1).map((item,index) => (
              <Image key={index} style={{
                width: 280,
                height: 280,
                resizeMode: "cover",
                borderRadius: 5,
              }} source={{uri:item}}/>
            ))}
            <View>
              <Text style={{fontFamily:"monospace",fontSize: 17, fontWeight: "bold"}}>{item?.name}
              </Text>
              <Text style={{
                  width: 200,
                  marginTop: 15,
                  fontSize: 16,
                  lineHeight: 24,
                  fontFamily: "monospace",
                  marginBottom: 8,
                }}>Description : {item?.description}</Text>

            </View>
          </View>

        </ScrollView>
        <View>
          <View  style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}>
          <Entypo name="dots-three-vertical" size={26} color="black" />
          <View  style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable    style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#f0f0f0",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
            <AntDesign name="star" size={26} color="black" />
            </Pressable>

            {selected ? (
               <Pressable  style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Animatable.View animation="swing" easing={"ease-in-out-circ"} iterationCount={1}>
                <AntDesign name="like1" size={27} color="white" />
                </Animatable.View>
              </Pressable>

            ):
            (
              <Pressable 
              onPress={()=>handleLikeOther(item._id)}
              style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
              <AntDesign name="like1" size={27} color="black" />            
              </Pressable>
            )}
           

          </View>
          </View>
        </View>
<View style={{marginVertical:15}}/>
      </View>

    )
  }
}

export default Profile

const styles = StyleSheet.create({})