import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { api } from "../api/client";
import { Trip } from "../types";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/RootNavigator";


export default function TripDetailsScreen() {
const route = useRoute<RouteProp<RootStackParamList, "TripDetails">>();
const { id } = route.params;
const [trip, setTrip] = useState<Trip | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);


const load = async () => {
setError(null);
try {
const { data } = await api.get<Trip>(`/trips/${id}`);
setTrip(data);
} catch (e: any) {
setError(e?.response?.data?.message || "S'u morën detajet");
} finally {
setLoading(false);
}
};


useEffect(() => { load(); }, [id]);


if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
if (error) return (
<View style={styles.center}>
<Text style={{ marginBottom: 12 }}>{error}</Text>
<Pressable onPress={load} style={styles.button}><Text style={styles.buttonText}>Provo përsëri</Text></Pressable>
</View>
);
if (!trip) return null;


return (
<View style={{ flex: 1, padding: 16 }}>
<Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 8 }}>{trip.title}</Text>
{trip.price != null && <Text style={{ color: "#6b7280", marginBottom: 8 }}>${trip.price}</Text>}
{trip.description && <Text style={{ lineHeight: 20 }}>{trip.description}</Text>}
</View>
);
}


const styles = StyleSheet.create({
center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
button: { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
buttonText: { color: "#fff", fontWeight: "700" },
});