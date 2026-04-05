import { StyleSheet } from "react-native";

export const Cores = {
  amarelo: "#FFD700",
  fundoEscuro: "#121212",
  fundoClaro: "#F5F5F5",
  cartaoEscuro: "#2C2C2C",
  cartaoClaro: "#FFFFFF",
  bordaEscura: "#3D3D3D",
  bordaClara: "#CCCCCC",
  textoBranco: "#FFFFFF",
  textoPreto: "#121212",
  textoMutado: "#A0A0A0",
};

export const globalStyles = StyleSheet.create({
  safeArea: { 
    flex: 1 
  },
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 30 
  },
  logo: { 
    width: 250, 
    height: 100, 
    marginBottom: 30, 
    alignSelf: "center" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  subtitle: { 
    fontSize: 16, 
    marginBottom: 30, 
    textAlign: "center" 
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 20, 
    fontSize: 16, 
    width: "100%" 
  },
  
  // O seu botão amarelo clássico
  button: {
    backgroundColor: Cores.amarelo,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Mantido apenas para o ícone ficar do lado do texto no Menu
  },
  buttonText: { 
    color: Cores.textoPreto, 
    fontSize: 16, 
    fontWeight: "bold" 
  },

  // Os botões de texto (Esqueceu a senha, Cadastre-se)
  linkButton: { 
    marginTop: 15, 
    alignItems: "center" 
  },
  linkText: { 
    fontWeight: "bold" 
  },

  
  botaoLargo: {
    flexDirection: "row", 
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
  },
  
  viewIcone: { 
    marginRight: 15, 
  },
  viewTexto: { 
    flex: 1, 
    justifyContent: "center" 
  },
});