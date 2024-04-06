import { Tabs } from "expo-router";
import {Feather} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons"
 import {MaterialIcons} from "@expo/vector-icons"
export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye" size={24} color="gray" />
            ),
        }}
      />
       <Tabs.Screen
        name="chat"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />

<Tabs.Screen
        name="bio"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons
                name="person-pin"
                size={24}
                color="black"
              />
            ) : (
              <MaterialIcons
                name="person-pin"
                size={24}
                color="gray"
              />
            ),
        }}
      />


        </Tabs>
    )
}