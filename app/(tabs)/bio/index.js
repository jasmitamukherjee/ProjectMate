import { StyleSheet, Text, View, ScrollView,
  Image,
  Pressable,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
const index = () => {
  const [option, setOption] = useState("Description");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);

  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];
  const keywords = [
    {
      id: "0",
      name: "React",
      description: "A JavaScript library for building user interfaces, commonly used for building single-page applications.",
    },
    {
      id: "1",
      name: "Java",
      description: "A high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
    },
    {
      id: "2",
      name: "NGO",
      description: "Non-governmental organization, a non-profit group that functions independently of any government.",
    },
    {
      id: "3",
      name: "Coding",
      description: "The process of using a programming language to instruct a computer to perform a certain task.",
    },
    {
      id: "4",
      name: "JavaScript",
      description: "A programming language that enables interactive web pages and is an essential part of web development.",
    },
    {
      id: "5",
      name: "Python",
      description: "A high-level programming language known for its simplicity and readability, widely used in web development, data science, and more.",
    },
    {
      id: "6",
      name: "HTML/CSS",
      description: "Markup and styling languages used for creating web pages.",
    },
    {
      id: "7",
      name: "Blockchain",
      description: "A decentralized and distributed digital ledger technology used to record transactions across multiple computers.",
    },
    {
      id: "8",
      name: "Mobile App Development",
      description: "The process of creating software applications that run on mobile devices, such as smartphones and tablets.",
    },
    {
      id: "9",
      name: "Data Science",
      description: "An interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.",
    },
    {
      id: "10",
      name: "Machine Learning",
      description: "A subset of artificial intelligence that focuses on the development of algorithms that enable computers to learn from and make predictions or decisions based on data.",
    },
  ];

  const data = [
    {
      id: "0",
      name: "Casual",
      description: "Looking for a casual partnership, exploring without pressure.",
    },
    {
      id: "1",
      name: "Long Term",
      description: "Seeking a committed, long-term collaboration.",
    },
    {
      id: "2",
      name: "Virtual",
      description: "Interested in virtual collaboration opportunities.",
    },
    {
      id: "3",
      name: "Open for Anything",
      description: "Open-minded and flexible, willing to explore various possibilities.",
    },
    {
      id: "4",
      name: "Project-based",
      description: "Focused on collaborating on specific projects or initiatives.",
    },
    {
      id: "5",
      name: "Networking",
      description: "Looking to expand professional connections and opportunities.",
    },
    {
      id: "6",
      name: "Mentorship",
      description: "Seeking mentorship opportunities or willing to mentor others.",
    },
    {
      id: "7",
      name: "Remote",
      description: "Prefer collaborating remotely or working with remote teams.",
    },
    {
      id: "8",
      name: "In-person",
      description: "Prefer collaborating in-person rather than remotely.",
    },
    {
      id: "9",
      name: "Flexible Schedule",
      description: "Looking for a collaborator with a flexible schedule for better coordination.",
    },
    {
      id: "10",
      name: "Creative Projects",
      description: "Interested in collaborating on innovative and creative projects.",
    },
  ];
  const renderImageCarousel = ({item}) =>{
    return(
    <View  style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Image  style={{
          width: "85%",
          resizeMode: "cover",
          height: 290,
          borderRadius: 10,
          transform: [{ rotate: "-5deg" }],
        }} source={{uri:item?.image}}/>
        <Text style={{fontFamily:"monospace",position:"absolute",top:10,right:10}}>{activeSlide + 1}/{profileImages.length}</Text>
    </View>
  )}
  return (
    <ScrollView>
      <View style={{height: "auto"}}>
      {/* <Image
          style={{borderBottomLeftRadius:160,borderBottomRightRadius:160,width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: "https://wallpapers.com/images/featured/plain-background-0aqx3e65vih1xev1.jpg",
          }}
        /> */}
        <View>
          <View>
            <Pressable style={{
                padding: 10,
                backgroundColor: "#c6a5d1",
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop:50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                // position: "absolute",
                // top: -60,
                // left: "50%",
                // transform: [{ translateX: -150 },{translateY: -20}],
               
              }} >
            <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
                source={{
                    uri:"https://cdn4.vectorstock.com/i/1000x1000/23/33/girl-user-icon-flat-vector-19152333.jpg",
                }}
              />
               <Text style={{fontFamily:"monospace",fontWeight:"bold",fontSize:17,marginTop:6}}>Pune</Text>
            <Text  style={{fontFamily:"monospace",fontSize:15,marginTop:4,fontWeight:"700"}}>21 years</Text>
              
            </Pressable>
           
          </View>
        </View>
      </View>
      <View  style={{
          marginTop: 30,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 25,
          justifyContent: "center",
        }}>
        <Pressable onPress={()=>setOption("Description")}>
          <Text  style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Description" ? "black" : "gray",
            }}>Description</Text>
        </Pressable>
        <Pressable  onPress={()=>setOption("Photos")}>
          <Text  style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Photos" ? "black" : "gray",
            }}>Photos</Text>
        </Pressable>
        <Pressable onPress={()=>setOption("Keywords")}>
          <Text  style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Keywords" ? "black" : "gray",
            }}>Keywords</Text>
        </Pressable>
        <Pressable onPress={()=>setOption("Looking For")}>
          <Text  style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Looking For" ? "black" : "gray",
            }}>Looking For</Text>
        </Pressable>
      </View >

      <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
        {option == "Description" && (
          <View  style={{
            marginTop:30,
            borderColor: "#202020",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            height: 300,
          }}>
            <TextInput  value={description} onChangeText={(text)=>setDescription(text)}
            style={{
             
                fontFamily: "monospace",
                fontSize: description ? 15 : 15,
              }} placeholder='Write the description of your project.'/>
              <Pressable  style={{
                marginTop: "auto",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: "#4c0a4f",
                borderRadius: 5,
                justifyContent: "center",
                padding: 10,
              }}>
                <Text style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  fontFamily:"monospace"
                }}>Publish in feed</Text>
                <MaterialIcons name="computer" size={24} color="white" />
              </Pressable>
          </View>
        )}


      </View >

      <View style={{ marginHorizontal: 14 }}>
        { option == "Photos" && (
          <View>
            <Carousel data={profileImages} renderItem={renderImageCarousel} sliderWidth={350} itemWidth={300} onSnapToItem={(index)=> setActiveSlide(index)}/>
            <View style={{marginTop:25}}>
              <Text style={{fontFamily:"monospace"}}>Add a picture of your project.</Text>
              <View style={{flexDirection:"row",alignItems:"center",gap:5,paddingVertical:5,borderRadius:5,marginTop:10,backgroundColor:"#dcdcdc"}}>
              <Ionicons style={{marginLeft:8,color:"gray"}} name="images" size={24} color="black" />
              <TextInput style={{fontFamily:"monospace",color:"gray",marginVertical:10,width:300}} placeholder='Enter your image url'/>
              </View>
              {/* <Button
  title='Add image'
  buttonStyle={{ marginTop: 5, backgroundColor: "#dcdcdc" }}
  titleStyle={{ color: "#4c0a4f" }}
/> */}
<TouchableOpacity
        style={{
          marginTop: 5,
          backgroundColor: '#dcdcdc',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={() => {
          // Handle button press here
        }}>
        <Text style={{ color: '#4c0a4f',fontWeight:"bold" ,fontFamily:"monospace",fontSize:15}}>Add image</Text>
      </TouchableOpacity>

            </View>

          </View>
        )}
      </View>

      <View  style={{ marginHorizontal: 14 }}>
  {option === "Keywords" && (
    <View>
      {keywords?.map((item, index) => {
        return (
          <Pressable style={{
            backgroundColor: "#edd5e5",
            padding: 10,
            marginVertical: 10,
            borderRadius:10
          }} key={index}>
            <View    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
              <Text style={{fontFamily:"monospace",fontSize:16,fontWeight:"bold"}}>{item?.name}</Text>
            </View>
            <Text style={{fontFamily:"monospace"}}>{item?.description}</Text>
          </Pressable>
        );
      })}
    </View>
  )}
</View>
<View style={{ marginHorizontal: 14}}>
  {option === "Looking For" && (
    
    <FlatList
    columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      data={data}
      renderItem={({ item }) => {
        return (
          <Pressable style={{
            // backgroundColor: lookingOptions.includes(item?.name)
            //   ? "#fd5c63"
            //   : "white",
            backgroundColor:"white",
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            margin: 10,
            borderRadius: 5,
            borderColor: "#edd5e5",
            // borderWidth: lookingOptions.includes(item?.name)
            //   ? "transparent"
            //   : 0.7,
            borderWidth:0.7
          }}>
            <View>
              <Text style={{fontFamily:"monospace",  textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 13,
                        color:"black"}}>{item?.name}</Text>
              <Text style={{fontFamily:"monospace",  textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 13,
                        color:"gray"}}>{item?.description}</Text>
            </View>
          </Pressable>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
    
  )}
</View>

    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})