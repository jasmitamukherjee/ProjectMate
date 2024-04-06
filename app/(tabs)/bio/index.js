import { StyleSheet, Text, View, ScrollView,
  Image,
  Pressable,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  } from 'react-native'
  import "core-js/stable/atob";
import {jwtDecode} from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'

const index = () => {
  //TODO 
  const router=useRouter()
  const [option, setOption] = useState("Description");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [userId,setUserId] = useState("");
  const [selectedKeywords,setSelectedKeywords] = useState([])
  const [lookingOptions,setLookingOptions] = useState([])
  const [imageUrl,setImageUrl] = useState("")
  const [images,setImages] = useState([])
  const [name,setName] = useState("")
  const [gender,setGender] = useState("")
console.log("User id",userId)

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

  const profiles = [
    {
      id: "0",
      name: "Shreya Rao",
      description:
        "Shreya's project is a marketplace connecting local artisans with customers seeking unique handmade products. Using a swipe-based interface, users can discover handcrafted items ranging from jewelry to home decor. Developed with React JS, JavaScript, HTML, CSS, React Native, and React Native CLI.",
      projectImages: [
        {
          id: "0",
          image:
            "https://images.pexels.com/photos/3236651/pexels-photo-3236651.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
    },
    {
      id: "1",
      name: "Aditi K",
      description:
        "Aditi's project is an online platform connecting pet owners with reliable pet sitters and dog walkers in their area. Utilizing a swipe-based interface, users can browse through profiles, read reviews, and book pet care services with ease. Built using React JS, JavaScript, HTML, CSS, React Native, and React Native CLI.",
      projectImages: [
        {
          id: "0",
          image:
            "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
    },
    {
      id: "10",
      name: "Rheaa Thakur",
      description:
        "Rheaa's project is a virtual fitness platform that connects users with personal trainers for customized workout sessions. Featuring a swipe-based interface, users can find fitness instructors, schedule sessions, and track their progress seamlessly. Developed with React JS, JavaScript, HTML, CSS, React Native, and React Native CLI.",
      projectImages: [
        {
          id: "0",
          image:
            "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
    },
    {
      id: "3",
      name: "Manisha Singha",
      description:
        "Manisha's project is a language exchange platform connecting language learners with native speakers worldwide. Through a swipe-based interface, users can find language partners, engage in conversations, and improve their language skills together. Crafted with React JS, JavaScript, HTML, CSS, React Native, and React Native CLI.",
      projectImages: [
        {
          id: "0",
          image:
            "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
    },
    {
      id: "4",
      name: "Nisha J",
      description:
        "Nisha's project is a volunteering platform connecting individuals with local nonprofit organizations and community projects. Using a swipe-based interface, users can discover volunteer opportunities, sign up for events, and make a positive impact in their community. Engineered with React JS, JavaScript, HTML, CSS, React Native, and React Native CLI.",
      projectImages: [
        {
          id: "0",
          image:
            "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
    },
  ];
  

const handleToggleKeywords= (keywords) =>{
  // console.log("keywords",keywords)
  if(selectedKeywords.includes(keywords)){
    removeKeywords(keywords)
  }else{
    addKeywords(keywords)
  }

}
const handleOption= (lookingFor)=>{
  if(lookingOptions.includes(lookingFor)){
    removeLookingFor(lookingFor)
  }
  else{
    addLookingFor(lookingFor)
  }
}
const addLookingFor= async (lookingFor)=>{
  try {
    const response = await axios.put(
      `http://192.168.1.3:5000/users/${userId}/looking-for`,
      {
        lookingFor: lookingFor,
      }
    );

    console.log(response.data);

    if (response.status == 200) {
      setLookingOptions([...lookingOptions, lookingFor]);
    }

    
  } catch (error) {
    console.log("Error adding looking for",error)
  }
}

const removeLookingFor = async (lookingFor) => {
  try {
    const response = await axios.put(
      `http://192.168.1.3:5000/users/${userId}/looking-for/remove`,
      {
        lookingFor: lookingFor,
      }
    );

    console.log(response.data); // Log the response for confirmation

    // Handle success or update your app state accordingly
    if (response.status === 200) {
      setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
    }
  } catch (error) {
    console.error("Error removing looking for:", error);
    // Handle error scenarios
  }
};
const addKeywords= async (keywords)=>{
  try {
    const response = await axios.put(
      `http://192.168.1.3:5000/users/${userId}/keywords/add`,
      {
        keywords: keywords,
      }
    );

    console.log(response.data);

    if (response.status == 200) {
      setSelectedKeywords([...selectedKeywords, keywords]);
    }
    
  } catch (error) {
    console.log("Error adding keywords",error)
    
  }
}
const removeKeywords = async (keywords)=>{
try {
  const response = await axios.put(
    `http://192.168.1.3:5000/users/${userId}/keywords/remove`,
    {
      keywords: keywords,
    }
  );

  console.log(response.data);

  if (response.status == 200) {
    setSelectedKeywords(selectedKeywords.filter((item) => item !== keywords));
  }
  
} catch (error) {
  console.log("Error removing keywords",error)
  
}
}

  const renderImageCarousel = ({item}) =>{
    return(
    <View  style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
      <Image  style={{
          width: "85%",
          resizeMode: "cover",
          height: 290,
          borderRadius: 10,
          transform: [{ rotate: "-5deg" }],
        }} source={{uri:item}}/>
        <Text style={{fontFamily:"monospace",position:"absolute",top:10,right:10}}>{activeSlide + 1}/{images.length}</Text>
    </View>
  )}


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

    setDescription(user?.user?.description);
    setSelectedKeywords(user.user?.keywords);
    setImages(user?.user.projectImages);
    setLookingOptions(user?.user.lookingFor)
    setName(user?.user.name)
    setGender(user?.user.gender)
      
    } catch (error) {
      console.log("Error finding user description",error)
      
    }
  }
  useEffect(()=>{
    if(userId){
      fetchUserDescription()
    }

  },[userId])
  const updateUserDescripton= async ()=>{
    try {
      const response = await axios.put(
        `http://192.168.1.3:5000/users/${userId}/description`,
        {
          description: description,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Description updated successfully");
      }
      
    } catch (error) {
      console.log("Error updating description for project",error)
      
    }
  }
  // console.log("desc",description)
  const handleAddImage= async ()=>{
 
      try{
        const response = await axios.post(`http://192.168.1.3:5000/users/${userId}/project-images`,{
            imageUrl:imageUrl
        });

        console.log(response);

        setImageUrl("");
      
    } catch (error) {
      console.log("Error posting image",error)
      
    }
  }
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex]
}
const randomImage = getRandomImage()
//added logout
const handleLogout= async ()=>{
  try {
    console.log("inside try");
    await AsyncStorage.removeItem("auth")
    router.push("/(authenticate)/login")
    
  } catch (error) {
    console.log("Error",error)
    
  }
}
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
                    uri:randomImage,
                }}
              />
               <Text style={{fontFamily:"monospace",fontWeight:"bold",fontSize:18,marginTop:6}}>{name}</Text>
            <Text  style={{fontFamily:"monospace",fontSize:15,marginTop:4,fontWeight:"700"}}>{gender}</Text>
              
            </Pressable>
           
          </View>
        </View>
      </View>
      <View  style={{
          marginTop: 30,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          
          justifyContent: "center",
        }}>
        <Pressable onPress={()=>setOption("Description")}>
          <Text  style={{
              fontSize: 13,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Description" ? "black" : "gray",
            }}>Description</Text>
        </Pressable>
        <Pressable  onPress={()=>setOption("Photos")}>
          <Text  style={{
              fontSize: 13,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Photos" ? "black" : "gray",
            }}>Photos</Text>
        </Pressable>
        <Pressable onPress={()=>setOption("Keywords")}>
          <Text  style={{
              fontSize: 13,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Keywords" ? "black" : "gray",
            }}>Keywords</Text>
        </Pressable>
        <Pressable onPress={()=>setOption("Looking For")}>
          <Text  style={{
              fontSize: 13,
              fontWeight: "bold",
              fontFamily:"monospace",
              color: option == "Looking For" ? "black" : "gray",
            }}>Looking For</Text>
        </Pressable>
      </View >

      <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
        {option == "Description" && (
          <>
          <View  style={{
            marginTop:30,
            borderColor: "#202020",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            height: 300,
          }}>
            <TextInput multiline value={description} onChangeText={(text)=>setDescription(text)}
            style={{
             
                fontFamily: "monospace",
                fontSize: description ? 15 : 15,
              }} placeholder='Write the description of your project.'/>
              <Pressable 
              onPress={updateUserDescripton} style={{
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
<View style={{width:100,flex:1,justifyContent:"center",alignSelf:"center"}}>
          <Pressable 
          onPress={handleLogout}
          style={{
                marginTop: 50,
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
                }}>
              Logout
            </Text>
          </Pressable>
          </View>
          </>
        )}


      </View >

      <View style={{ marginHorizontal: 14 }}>
        { option == "Photos" && (
          <View>
            <Carousel data={images} renderItem={renderImageCarousel} sliderWidth={350} itemWidth={300} onSnapToItem={(index)=> setActiveSlide(index)}/>
            <View style={{marginTop:25}}>
              <Text style={{fontFamily:"monospace"}}>Add a picture of your project.</Text>
              <View style={{flexDirection:"row",alignItems:"center",gap:5,paddingVertical:5,borderRadius:5,marginTop:10,backgroundColor:"#dcdcdc"}}>
              <Ionicons style={{marginLeft:8,color:"gray"}} name="images" size={24} color="black" />
              <TextInput value={imageUrl} onChangeText={(text)=>setImageUrl(text)} style={{fontFamily:"monospace",color:"gray",marginVertical:10,width:300}} placeholder='Enter your image url'/>
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
        onPress={
          
          handleAddImage
        }>
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
          <Pressable
          onPress={()=>handleToggleKeywords(item?.name)}
          style={{
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
              <Text style={{fontFamily:"monospace",fontSize:16,fontWeight:"bold",flex:1}}>{item?.name}</Text>
              {selectedKeywords.includes(item?.name) && (
                <AntDesign name="checkcircle" size={18} color="black" />

              )}
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
          <Pressable 
          onPress={()=> handleOption(item?.name)}
          style={{
            backgroundColor: lookingOptions.includes(item?.name)
              ? "#4c0a4f"
              : "white",
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            margin: 10,
            borderRadius: 5,
            borderColor: "#4c0a4f",
            // borderWidth: lookingOptions.includes(item?.name)
            //   ? "transparent"
            //   : 0.7,
          }}>
            <View>
              <Text style={{fontFamily:"monospace",  textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 13,
                        color:lookingOptions.includes(item?.name)?"white":"black"}}>{item?.name}</Text>
              <Text style={{fontFamily:"monospace",  textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 13,
                        color:lookingOptions.includes(item?.name)?"white":"gray"}}>{item?.description}</Text>
            </View>
          </Pressable>
        );
      }}
      // keyExtractor={(item, index) => index.toString()}
    />
    
  )}
</View>

    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})