import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    logo: { width: 200, height: 200, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 40 },
    button: {
        backgroundColor: "#FFD700",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", 
        marginBottom: 20,
        width: "80%",
    },
    buttonText: { color: "#121212", fontSize: 18, fontWeight: "bold" },
});