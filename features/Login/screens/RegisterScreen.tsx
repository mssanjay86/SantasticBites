import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { GlobalLayout } from "../../../common/components/GlobalLayout";
import { SPACING } from '../../../common/styles/spacing';
import { COLORS } from '../../../common/styles/colors';

type Role = "Consumer" | "Provider";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  address: string;
  city: string;
  pincode: string;
  businessName: string;
  gstNumber: string;
};

const RegisterScreen: React.FC = () => {
  const [role, setRole] = useState<Role>("Consumer");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    city: "",
    pincode: "",
    businessName: "",
    gstNumber: "",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    console.log("Role:", role);
    console.log("Form Data:", formData);
  };

  return (
    <GlobalLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Create an account to start ordering</Text>

      {/* Toggle Switch */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            role === "Consumer" && styles.activeToggle,
          ]}
          onPress={() => setRole("Consumer")}
        >
          <Text
            style={[
              styles.toggleText,
              role === "Consumer" && styles.activeText,
            ]}
          >
            Consumer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            role === "Provider" && styles.activeToggle,
          ]}
          onPress={() => setRole("Provider")}
        >
          <Text
            style={[
              styles.toggleText,
              role === "Provider" && styles.activeText,
            ]}
          >
            Provider
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Form */}
      {role === "Provider" && (
        <>
          <TextInput
            placeholder="Business Name"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.input}
            value={formData.businessName}
            onChangeText={(text) => handleChange("businessName", text)}
          />
        </>
      )}

      <TextInput
        placeholder="Full Name"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        value={formData.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.mobileNumber}
        onChangeText={(text) => handleChange("mobileNumber", text)}
      />

      <TextInput
        placeholder="Address"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        value={formData.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      <TextInput
        placeholder="City"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        value={formData.city}
        onChangeText={(text) => handleChange("city", text)}
      />

      <TextInput
        placeholder="Pincode"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        keyboardType="numeric"
        value={formData.pincode}
        onChangeText={(text) => handleChange("pincode", text)}
      />

      {role === "Provider" && (
        <TextInput
          placeholder="GST Number (Optional)"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
          value={formData.gstNumber}
          onChangeText={(text) => handleChange("gstNumber", text)}
        />
      )}

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </GlobalLayout>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  card: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.text,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.surface,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontFamily: "Inter-Regular",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: 8,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});
