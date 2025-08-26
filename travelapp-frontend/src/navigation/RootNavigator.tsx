import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";


export type RootStackParamList = {
Login: undefined;
Home: undefined;
TripDetails: { id: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigator() {
const { token, loading } = useAuth();


if (loading) return null; // mund të vendosësh një splash/loader


return (
<NavigationContainer>
{token ? (
<Stack.Navigator>
<Stack.Screen name="Home" component={HomeScreen} options={{ title: "Trips" }} />
<Stack.Screen name="TripDetails" component={TripDetailsScreen} options={{ title: "Details" }} />
</Stack.Navigator>
) : (
<Stack.Navigator>
<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
</Stack.Navigator>
)}
</NavigationContainer>
);
}