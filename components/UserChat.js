import { StyleSheet, Text, View,Pressable ,Image} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios"

const UserChat = ({item,userId}) => {
    const [messages,setMessages] = useState([]);
    const router = useRouter();
    const params = useLocalSearchParams();

    const getLastMessage = () => {
        const n = messages.length;


        return messages[n-1];
    }
    const lastMessage = getLastMessage();
    useEffect(() => {
        fetchMessages();
      }, []);
      const fetchMessages = async () => {
        try {
          const senderId = userId;
          const receiverId = item?._id;
          const response = await axios.get("http://192.168.1.5:5000/messages", {
            params: { senderId, receiverId },
          });
    
          // Assuming messages are stored in state to display in the UI
          setMessages(response.data);
          // console.log("sender id from axios userchat",senderId)
          // console.log("receiver id from axios userchat",receiverId)

        } catch (error) {
          console.error("Error fetching messages:", error);
          // Handle error scenarios
        }
      };
      const handlePress =() =>{
        // console.log(item?.name)
        // console.log("front",userId)
        // console.log("front",item?._id)
if(router)        {router.push({
            pathname: "/chat/chatroom",
            params: {
              image: item?.projectImages[0],
              name: item?.name,
              receiverId: item?._id,
              senderId: userId,
              // image: "mock-image-url",
              // name: "Mock Name",
              // receiverId: "mock-receiver-id",
              // senderId: "mock-sender-id",
            },
          })}
          else{
            console.log("router problem")
          }

      }
  return (
    
    <Pressable 
    onPress={
      // 
      // router.push("/chat/chatroom")
      handlePress
    }
    style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 12,
      }}>
        <View>
            <Image  style={{ width: 60, height: 60, borderRadius: 35 }} source={{uri:item?.projectImages[0]}} />
        </View>
        <View>
        <Text  style={{
            fontWeight: "bold",
            color: "#662c65",
            fontSize: 15,
            fontFamily: "monospace",
          }}>
        {item?.name}
        </Text>
        <Text   style={{
            fontSize: 15,
            fontWeight: "500",
            marginTop: 6,
            fontFamily: "monospace",
          }}>
          {lastMessage ? lastMessage?.message : `Start Chat with ${item?.name}`}
        {/* Start chat with {item?.name} */}
        </Text>
        </View>
    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})