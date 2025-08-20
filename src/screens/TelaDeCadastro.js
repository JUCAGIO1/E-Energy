import { View, Image, Text, TouchableOpacity, TextInput, } from "react-native";
import { CheckBox } from "@react-native-community/checkbox"

export default function TelaDeAcesso({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start",  backgroundColor: "white" ,}}>
         <Text style={{fontSize: 40, paddingTop: 15, paddingLeft:10}}>Cadastre-se</Text>
         <Text style={{paddingLeft:10}}> Lorem Ipsum Lorem Ipsum</Text>

         <Text style={{ paddingLeft:15, paddingTop:30}}>Nome:</Text>
         <TextInput style={{ borderWidth:1, width:"90%", paddingLeft:10, marginLeft: 15, backgroundColor:"lightblue" }}placeholder="Seu nome"></TextInput>
         
         <Text style={{ paddingLeft:10, paddingTop:40}}> E-mail: </Text>
         <TextInput style={{ borderWidth:1, width:"90%", paddingLeft:10, marginLeft: 15, backgroundColor:"lightblue" }}placeholder="seuemail@gmail.com"></TextInput>

         <Text style={{ paddingLeft:15, paddingTop:30}}>Senha:</Text>
         <TextInput style={{ borderWidth:1, width:"90%", paddingLeft:10, marginLeft: 15, backgroundColor:"lightblue" }}placeholder="******"></TextInput>

         
          <TouchableOpacity style={{ borderRadius:5, backgroundColor:"green", width:"85%", height:"6%",justifyContent: "center", alignItems: "center",marginTop:40, marginLeft:25}}>
            <Text>Acessar</Text>
          </TouchableOpacity>


         <Text style={{ textAlign: "center",marginTop:30 }}> ------------ Outras formas de login ------------ </Text>
         
         <View style={{flexDirection:"row",display:"flex", justifyContent:"space-around",alignItems:"flex-end" }}>
          <Image
          source={require("../assets/Google.png")}
          styule={{ marginTop:30 }}>
          </Image>

          <Image 
          source={require("../assets/Facebook.png")}
          >
          </Image>
         </View>
    </View>
  );
}
