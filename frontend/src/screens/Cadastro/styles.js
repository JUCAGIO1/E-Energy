
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeAreaView: { flex: 1 },
    container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: { 
      borderWidth: 1, 
      borderRadius: 12, 
      padding: 15, 
    marginBottom: 20, 
    fontSize: 16,
},
button: { 
    backgroundColor: "#FFD700", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 20, alignItems: "center" },
  linkText: { fontWeight: "bold" },
});