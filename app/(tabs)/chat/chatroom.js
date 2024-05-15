import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Pressable,
  } from "react-native";
  import React, { useLayoutEffect, useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { Ionicons } from "@expo/vector-icons";
  import { useLocalSearchParams } from "expo-router";
  import { Entypo, Feather } from "@expo/vector-icons";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";


  import { io } from "socket.io-client";
  import axios from "axios";
  
  const chatroom = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const params = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);

    const socket = io("http://192.168.1.5:8000");
    socket.on("connect", () => {
      console.log("Connected to the Socket.IO server");
    });
    socket.on("receiveMessage", (newMessage) => {
      console.log("new Message", newMessage);
  
      //update the state to include new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    const sendMessage = async (senderId, receiverId) => {
      // console.log("trying to send")
      // console.log(message)
      socket.emit("sendMessage", { senderId, receiverId, message });
  
      setMessage("");
  
      // call the fetchMessages() function to see the UI update
      setTimeout(() => {
          fetchMessages();
      },200)
    };

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "",
        headerLeft: () => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            {selectedMessages.length > 0 ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "500",fontFamily:"monospace" }}>
                  {selectedMessages.length}
                </Text>
                {/* <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
          <Ionicons name="md-arrow-undo" size={24} color="black" />
          <FontAwesome name="star" size={24} color="black" /> */}
          <MaterialIcons
            onPress={() => deleteMessages(selectedMessages)}
            name="delete"
            size={24}
            color="black"
          />
              </View>
              
            ):(
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: params?.image }}
              />
              <Text style={{ fontSize: 15, fontWeight: "bold",fontFamily:"monospace" }}>
                {params?.name}
              </Text>
            </View>
            )}
          
          </View>
        ),
        headerRight: () => 
        {selectedMessages.length > 0 ? (
          <View >
          
        </View>

        ):
          (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
              <Ionicons name="videocam-outline" size={24} color="black" />
            </View>
          )}
      
      });
    }, [navigation, params, selectedMessages]);

    const deleteMessages = async (messageIds) => {
      console.log("trying to delete")
      try {
        const response = await axios.post("http://192.168.1.5:5000/delete", {
          messages: messageIds, // Send selectedMessages array as messages
        });
        if (response.status === 200) {
          setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );
  // setSelectedMessages([])
          fetchMessages();
        }
        //  else {
        //   console.log("response not ok", response.status);
        // }
      } catch (error) {
        console.log("error deleting messages", error);
      }
    };
    const fetchMessages = async () => {
      try {
        const senderId = params?.senderId;
        const receiverId = params?.receiverId;
        console.log("sender id",senderId)
        console.log("recieevr id",receiverId)
        const response = await axios.get("http://192.168.1.5:5000/messages", {
          params: { senderId, receiverId },
        });
  
        setMessages(response.data);
      } catch (error) {
        console.log("Error fetching the messages", error);
      }
    };
    useEffect(() => {
      fetchMessages();
    }, []);

    const handleSelectMessage = (message) => {
      console.log("long press")
      //check if the message is already selected
      const isSelected = selectedMessages.includes(message._id);
  
      if (isSelected) {
        setSelectedMessages((previousMessages) =>
          previousMessages.filter((id) => id !== message._id)
        );
      } else {
        setSelectedMessages((previousMessages) => [
          ...previousMessages,
          message._id,
        ]);
      }
    };
    //to b commented
    console.log("messages",selectedMessages)
    const formatTime = (time) => {
      const options = { hour: "numeric", minute: "numeric" };
      return new Date(time).toLocaleString("en-US", options);
    };

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {messages?.map((item, index) => (
            <Pressable
            onLongPress={() => handleSelectMessage(item)}

              style={[
                item?.senderId === params?.senderId
                  ? {
                      alignSelf: "flex-end",
                      backgroundColor: "#662c65",
                      padding: 8,
                      maxWidth: "60%",
                      borderRadius: 7,
                      margin: 10,
                    }
                  : {
                      alignSelf: "flex-start",
                      backgroundColor: "#300830",
                      
                      padding: 8,
                      margin: 10,
                      borderRadius: 7,
                      maxWidth: "60%",
                    },
                    // isSelected && { width: "100%", backgroundColor: "#F0FFFF" }
                    selectedMessages.includes(item._id) && { width: "100%", backgroundColor: "#dcdcdc" }


              ]}
            >
              <Text style={{ fontSize: 13, textAlign: "left", color: "white",fontWeight:"500" ,fontFamily:"monospace"}}>
                {item?.message}
              </Text>
              <Text style={{fontFamily:"monospace", fontSize:9,textAlign:"right",color:"#F0F0F0",marginTop:5}}>{formatTime(item?.timestamp)}</Text>
            </Pressable>
          ))}
        </ScrollView>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            marginBottom: 1,
          }}
        >
          <Entypo
            style={{ marginRight: 7 }}
            name="emoji-happy"
            size={24}
            color="gray"
          />
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
                fontFamily:"monospace",
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#dddddd",
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Type your message..."
          />
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginHorizontal: 8,
            }}
          >
            <Entypo name="camera" size={24} color="gray" />
  
            <Feather name="mic" size={24} color="gray" />
          </View>
  
          <Pressable
            onPress={() => sendMessage(params?.senderId, params?.receiverId)}
            style={{
              backgroundColor: "#007bff",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ textAlign: "center", color: "white",fontFamily:"monospace" }}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default chatroom;
  
  const styles = StyleSheet.create({});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const chatroom = () => {
//   return (
//     <View>
//       <Text>chatroom</Text>
//     </View>
//   )
// }

// export default chatroom

// const styles = StyleSheet.create({})