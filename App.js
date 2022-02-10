import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator
} from "react-native";

const Extras = ({ label, value }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default function App() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const starWarsUrl = `https://swapi.dev/api/people/${page}`;

  const fetchStarWarsCharacter = async () => {
    setLoading(true);
    const res = await fetch(starWarsUrl);
    const res_json = await res.json();
    setLoading(false);
    setData(res_json);
  };

  useEffect(() => {
    fetchStarWarsCharacter();
  }, [page]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPage((prevPage) => prevPage + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={48} color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button title="Next" onPress={() => setPage(page + 1)} />

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require("./assets/yoda.png")} style={styles.img} />
          <View>
            <Text>{data.name}</Text>
            <Text>{data.gender}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Extras label="Birth year" value={data.birth_year} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderColor: "black",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8
  },
  img: {
    width: 48,
    height: 48,
    marginRight: 8
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});
