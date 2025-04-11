// import React from "react";
// import "./globals.css";
// import Events from "./events";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// export default function RootLayout() {
//   return (
//     <Stack.Navigator initialRouteName="events" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="events" component={Events} />
//     </Stack.Navigator>
//   )
// }


import { Slot } from 'expo-router';
import './globals.css';

export default function RootLayout() {
  return <Slot />;
}

