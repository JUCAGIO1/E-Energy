import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeAreaView: { flex: 1 },
    container: { flex: 1, alignItems: "center", paddingTop: 40 },
    title: { fontSize: 24, marginBottom: 20 },
    roomButton: {
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 15,
        width: "80%",
        alignItems: "center",
    },
    roomText: { fontSize: 16, fontWeight: "bold" },
    releButton: {
        marginTop: 30,
        backgroundColor: "#FFD700",
        padding: 15,
    borderRadius: 12,
    width: "60%",
    alignItems: "center",
},
  releText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
});