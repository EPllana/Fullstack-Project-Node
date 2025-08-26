import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";

const schema = z.object({
  firstName: z.string().min(1, "Shkruaj emrin"),
  lastName: z.string().min(1, "Shkruaj mbiemrin"),
  email: z.string().email("Email i pavlefshëm"),
  phoneNumber: z.string().min(6, "Numër telefoni i pavlefshëm"),
  password: z.string().min(6, "Min 6 karaktere"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/users", {
        ...data,
        email: data.email.toLowerCase(),
      });
      Alert.alert("Sukses", "Regjistrimi u krye me sukses!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Regjistrimi dështoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regjistrohu në TravelApp</Text>

      {/* Emri dhe Mbiemri në një rresht */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="Name"
              placeholderTextColor="#888"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[styles.input, { flex: 1, marginRight: 8 }]}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              placeholder="Surname"
              placeholderTextColor="#888"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={[styles.input, { flex: 1, marginLeft: 8 }]}
            />
          )}
        />
      </View>
      {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
      {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, { marginBottom: 12 }]}         
             />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, { marginBottom: 12 }]}         
             />
        )}
      />
      {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, { marginBottom: 2 }]}
            />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable disabled={loading} onPress={handleSubmit(onSubmit)} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Regjistrohu</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24, textAlign: "center", color: "#000" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12, backgroundColor: "#fff", color: "#000" },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12 },
  buttonText: { color: "white", fontWeight: "700" },
  error: { color: "#dc2626", marginBottom: 8 },
});
