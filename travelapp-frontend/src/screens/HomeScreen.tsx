// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api/client"; // sigurohu që ke krijuar klientin axios
import { Trip } from "../types"; // tipi yt

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setError(null);
    try {
      const { data } = await api.get<Trip[]>("/trips");
      setTrips(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || "S'doli lista e udhëtimeve");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>{error}</Text>
        <Pressable onPress={load} style={styles.button}>
          <Text style={styles.buttonText}>Provo përsëri</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />
      }
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("TripDetails", { id: item.id })}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.price != null && <Text style={styles.muted}>${item.price}</Text>}
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  button: { backgroundColor: "#2563eb", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  buttonText: { color: "#fff", fontWeight: "700" },
  card: { padding: 16, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 16, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  muted: { color: "#6b7280" },
});
