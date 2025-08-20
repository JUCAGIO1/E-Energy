import { View, Image, Text, TouchableOpacity } from "react-native";

export default function TelaDeLogin({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "white" ,paddingTop: 60, }}>
      <Image
        source={require("../assets/casual_dog.png")}
        style={{ width: "30%", aspectRatio: 1, resizeMode: "contain",}}
      />

      <Text style={{ fontSize: 40, padding:20, }} > Ótimo Dia! </Text>
      <Text style={{padding:0}}>Seja bem vindo</Text>

      <TouchableOpacity  onPress={() => navigation.navigate('TelaDeAcesso')} style={{backgroundColor:"green", borderRadius:5, marginTop:30, width:"65%", height:"6%",justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
        <View style={{width: 35, height: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 5,}}><Image source={require("../assets/Google.png")} style={{width:"100%", height:"100%"}}/></View>
        <Text style={{color:"white",}}>         Fazer login com o google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TelaDeCadastro')} style={{backgroundColor:"white", marginTop:10, width:"65%", height:"6%",justifyContent: "center", alignItems: "center", flexDirection: "row", borderColor:"black", borderWidth:1, borderRadius:5,}}>        
        <Text> Cadastrar-se </Text>
      </TouchableOpacity>

    </View>
  );
}
