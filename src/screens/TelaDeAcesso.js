import { View, Image, Text, TouchableOpacity, TextInput, } from "react-native";
import { CheckBox } from "@react-native-community/checkbox"

export default function TelaDeAcesso({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start",  backgroundColor: "white" ,}}>
         <Text style={{fontSize: 40, paddingTop: 15, paddingLeft:10}}>Acesse</Text>
         <Text style={{paddingLeft:10}}> Acesse nosso App </Text>

         <Text style={{ paddingLeft:10, paddingTop:40}}> E-mail: </Text>
         <TextInput style={{ borderWidth:1, width:"90%", paddingLeft:10, marginLeft: 15, backgroundColor:"lightblue" }}placeholder="seuemail@gmail.com"></TextInput>
         
         <Text style={{ paddingLeft:15, paddingTop:30}}>Senha:</Text>
         <TextInput style={{ borderWidth:1, width:"90%", paddingLeft:10, marginLeft: 15, backgroundColor:"lightblue" }}placeholder="******"></TextInput>
         
         {/*<CheckBox></CheckBox>*/}
         
        
         
         <Text style={{paddingLeft:"50%", paddingTop:20 }}>Esqueci minha senha</Text>

         <View style={{flexDirection:"row", justifyContent:"space-between", }}>
          <TouchableOpacity style={{ marginLeft:20, borderRadius:5, backgroundColor:"green", marginTop:30, width:"40%", height:"120%",justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <Text>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={{ borderWidth:1, borderRadius:5, marginRight:20, backgroundColor:"white", marginTop:30, width:"40%", height:"120%",justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <Text>Voltar</Text>
          </TouchableOpacity>
         </View>

         <Text style={{ marginTop: 80, textAlign: "center" }}> ------------ Outras formas de login ------------ </Text>
         
        
         
         <View style={{flexDirection:"row", justifyContent:"space-between", }}>
          <Image
          source={require("../assets/Google.png")}
          style={{marginLeft:"22%"}}>
          </Image>

          <Image 
          source={require("../assets/Facebook.png")}
          style={{marginRight:"24%"}}>
          </Image>
         </View>
    </View>
  );
}