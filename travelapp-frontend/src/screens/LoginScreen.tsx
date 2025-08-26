import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(email.toLowerCase(), password); // <-- lowercase
      navigation.navigate("Home");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Nuk u kyçe. Kontrollo kredencialet.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mirësevjen në TravelApp</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            placeholderTextColor="#888"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.input}
            placeholderTextColor="#888"
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable disabled={loading} onPress={handleSubmit(onSubmit)} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Kyçu</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 16 }}>
        <Text style={{ color: "#2563eb", textAlign: "center" }}>Nuk ke llogari? Regjistrohu këtu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12, marginBottom: 12, color: "#000" },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  error: { color: "#dc2626", marginBottom: 8 },
});
