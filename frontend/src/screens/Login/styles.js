import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  container: { backgroundColor: "#121212", flex: 1, justifyContent: "center", padding: 30 },
  header: { alignItems: "center", marginBottom: 40 },
  logo: { width: 300, height: 100, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16 },
  input: {
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    padding: 15,
    fontSize: 16,
  },
  linkButton: { alignSelf: "flex-end", marginBottom: 30 },
  linkText: { fontWeight: "600" },
  loginButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: { color: "#121212", fontSize: 18, fontWeight: "bold" },
  footerLink: { alignItems: "center", marginTop: 10 },
  footerText: { fontSize: 14 },
  signUpText: { fontWeight: "bold" },
});