import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const getDados = async () => {
  try {
    const response = await axios.get('https://e-energy-api.onrender.com/api/dados')
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
    return null;
  };
}

const getComodos = async () => {
  try {
    const response = await axios.get('https://e-energy-api.onrender.com/api/comodos')
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
    return null;
  };
}

export default function TelaComodos({ route }) {
  const { nomeCasa } = route.params;
  const [releStatus, setReleStatus] = useState(false);
  const [dados, setDados] = useState([]);
  const [comodos, setComodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedComodos = await getComodos();
      const fetchedDados = await getDados();

      if (fetchedComodos) {
        setComodos(fetchedComodos);
      }
      if (fetchedDados) {
        setDados(fetchedDados);
      }
    };

    fetchData();
  }, []);

  const toggleRele = async () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);

    try {
      const url = novoEstado
        ? "http://192.168.0.150/ligar"
        : "http://192.168.0.150/desligar";

      const response = await fetch(url);
      const texto = await response.text();

      Alert.alert("Relé", texto); // Exibe a resposta do ESP32
    } catch (error) {
      Alert.alert("Erro", "Não foi possível comunicar com o ESP32");
      setReleStatus(!novoEstado); // Reverte o estado se a requisição falhar
    }
  };

  const showComodoData = (comodo) => {
    const comodoDados = dados.filter(dado => dado.comodo_id === comodo.id);

    if (comodoDados.length > 0) {
      const consumo = comodoDados[0].consumo || "N/A";
      const potencia = comodoDados[0].potencia || "N/A";
      const custo = comodoDados[0].custo || "N/A";

      Alert.alert(
        `Consumo de energia no ${comodo.nome}`,
        `Consumo: ${consumo} kWh\nPotência: ${potencia} W\nCusto: R$ ${custo}`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        `Consumo de energia no ${comodo.nome}`,
        "Não há dados disponíveis para este cômodo.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cômodos de {nomeCasa}</Text>

        {comodos.map((comodo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomButton}
            onPress={() => showComodoData(comodo)}
          >
            <Text style={styles.roomText}>{comodo.nome}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.releButton} onPress={toggleRele}>
          <Text style={styles.releText}>
            {releStatus ? "Desativar Relé" : "Ativar Relé"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 24, color: "#FFFFFF", marginBottom: 20 },
  roomButton: {
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  roomText: { color: "#FFD700", fontSize: 16, fontWeight: "bold" },
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

/*const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database("eenergy.db");

db.run("PRAGMA foreign_keys = ON");

db.run(`CREATE TABLE IF NOT EXISTS leituras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  corrente REAL,
  potencia REAL,
  consumo REAL,
  custo REAL,
  rele_estado INTEGER,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  comodo_id INTEGER,
  FOREIGN KEY (comodo_id) REFERENCES comodos(id) ON DELETE SET NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS comodos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(40)
)`);

app.post("/api/dados", (req, res) => {
  const { corrente, potencia, consumo, custo, rele_estado, comodo_id } = req.body;
  db.run(
    `INSERT INTO leituras (corrente, potencia, consumo, custo, rele_estado, comodo_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [corrente, potencia, consumo, custo, rele_estado, comodo_id],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Erro ao salvar dados");
      } else {
        res.status(200).send("OK");
      }
    }
  );
});

app.get("/api/dados", (req, res) => {
  db.all("SELECT * FROM leituras ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post("/api/comodos", (req, res) => {
  const { nome } = req.body;
  db.run(
    `INSERT INTO comodos (nome)
     VALUES (?)`,
    [nome],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Erro ao salvar dados");
      } else {
        res.status(200).send("OK");
      }
    }
  );
});

app.get("/api/comodos", (req, res) => {
  db.all("SELECT * FROM comodos ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
*/