import { StyleSheet, Text, View,SafeAreaView,ScrollView ,Image,Pressable} from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const select = () => {
    const router= useRouter()
    const params = useLocalSearchParams();
    const profiles = JSON.parse(params?.profiles);
    const [userId] = params?.userId
    const handleMatch = async (selectedUserId) => {
        try {
          await axios.post("http://10.24.68.215:5000/create-match", {
            currentUserId: userId,
            selectedUserId: selectedUserId,
          });
    
          setTimeout(() => {
            router.push("/chat");
          }, 500);
        } catch (error) {
          console.log("error", error);
        }
      };
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 10 }}>

        <View  style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}>
                <Text style={{ textAlign: "center", fontFamily: "monospace" }}>Nearby</Text>
            </View>
            <View style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}>
                <Text style={{ textAlign: "center", fontFamily: "monospace" }}>Looking For</Text>
            </View>
            <View style={{ backgroundColor: "#F0F0F0", padding: 10, borderRadius: 18 }}>
                <Text style={{ textAlign: "center", fontFamily: "monospace" }}>Keywords</Text>
            </View>
        </View>
       
{/* //add */}

{profiles?.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          {profiles?.map((item, index) => (
            <View style={{ marginVertical: 15 }}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" ,fontFamily:"monospace"}}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        width: 200,
                        marginTop: 15,
                        fontSize: 18,
                        lineHeight: 24,
                        fontFamily: "monospace",
                        marginBottom: 8,
                      }}
                    >
                      {item?.description}
                    </Text>
                  </View>

                  {item?.projectImages?.slice(0, 1).map((item, index) => (
                    <Image
                      style={{
                        width: 280,
                        height: 280,
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                      source={{ uri: item }}
                    />
                  ))}
                </View>
              </ScrollView>

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <Entypo name="dots-three-vertical" size={26} color="black" />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Pressable
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
            <AntDesign name="star" size={26} color="black" />
                    </Pressable>

                    <Pressable
                      onPress={() => handleMatch(item._id)}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                                 <AntDesign name="like1" size={27} color="black" />            

                    </Pressable>
                  </View>
                </View>
              </View>

              <View>
                <Text>Keywords</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {item?.keywords?.map((item, index) => (
                    
                    <View
                      style={{
                        backgroundColor: "#4c0a4f",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "500",
                          fontFamily: "monospace",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                    
                  ))}
                </View>
                </ScrollView>
              </View>

              <View style={{ marginTop: 12 }}>
                <Text>Looking For</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {item?.lookingFor?.map((item, index) => (
                    <View
                      style={{
                        backgroundColor: "#c6a5d1",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "black",
                          fontWeight: "500",
                          fontFamily: "monospace",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "monospace",
                textAlign: "center",
                fontWeight:"bold"
              }}
            >
              UH - OH{" "}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "monospace",
                  color: "#FF69B4",
                }}
              >
                No likes yet!
              </Text>
            </Text>

            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600",fontFamily:"monospace" }}>
              Improve your project description to get better likes.
            </Text>
          </View>
        </View>
      )}
{//add
}

    </ScrollView>
  )
}

export default select

const styles = StyleSheet.create({})