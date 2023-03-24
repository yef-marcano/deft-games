import React, { useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, FlatList, LogBox, ImageBackground, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertBug } from "../helper/Alert";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { mainApi } from "../services";
import Menu from "../components/Menu";

import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, icons, images, dummyData } from "../constants";
const Home = ({ navigation }) => {
  const [profile, setProfile] = React.useState(dummyData.profileData);
  const [myBooks, setMyBooks] = React.useState(dummyData.myBooksData);
  const [categories, setCategories] = React.useState(dummyData.categoriesData);
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [userdata, setUserdata] = React.useState({});
  const [games, setGames] = React.useState([]);
  const [torneos, setTorneos] = React.useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    usuario();
    juegos();
    callTorneos();
  }, []);

  async function usuario() {
    let user = await AsyncStorage.getItem("@user_data");
    const obj = JSON.parse(user);
    setUserdata(obj);
    console.log(userdata);
  }
  async function juegos() {
    try {
      await mainApi("", "juegos", "GET").then((res) => {
        if (res.data.status === 200) {
          setGames(res.data.detalle);
          return;
        } else {
          AlertBug(res.data.detalle);
        }
      });
    } catch (error) { }
  }
  async function callTorneos() {
    try {
      await mainApi("", "torneos", "GET").then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.detalle);
          setTorneos(res.data.detalle);
          return;
        } else {
          AlertBug(res.data.detalle);
        }
      });
    } catch (error) { }
  }

  function renderButtonSection() {
    var games = [];

    let selectedCategoryBooks = categories.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      games = selectedCategoryBooks[0].books;
    }

    const renderItem = ({ item }) => {
      console.log("test");
      console.log(item);
      return (
        <View
          style={{
            marginVertical: SIZES.base,
            width: SIZES.width / 1.3,
            marginRight: 20,
          }}
        >
          <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}>
            <ImageBackground
              source={{ uri: item?.img }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 120,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
              imageStyle={{ borderRadius: 15, opacity: 0.6 }}
            >
              <View
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.body2,
                    fontWeight: "600",
                  }}
                >
                  100
                </Text>
                <Image
                  source={images.coindeft}
                  style={{ height: 30, width: 35, marginRight: 20 }}
                />
              </View>
              <View
                style={{
                  paddingBottom: 10,
                  paddingLeft: 10,
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: SIZES.body2,
                    fontWeight: "800",
                  }}
                >
                  Usuarios Premium
                </Text>
              </View>
            </ImageBackground>

            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                height: "100%",
                justifyContent: "center",
              }}
            >
              {/* aqui texto */}
            </View>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>
          Torneos Destacados
        </Text>
        <View style={{ height: 150, width: SIZES.width }}>
          <FlatList
            data={torneos}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderMyBookSection(juegos) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flex: 1,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate("Salas", {
              book: item,
            })
          }
        >
          <View
            style={{
              flexDirection: "column",
              height: 100,
              backgroundColor: COLORS.lightGray,
              borderRadius: SIZES.radius,
              padding: 5,
              height: 160,
            }}
          >
            <Image
              source={{ uri: item.img }}
              resizeMode="cover"
              style={{
                width: 100,
                height: 130,
                borderRadius: 10,
              }}
            />
            <View>
              <Text style={{ color: COLORS.white }}> {item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            Todos los juegos
          </Text>
        </View>
        <SafeAreaView style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            data={juegos}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory == item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var games = [];

    let selectedCategoryBooks = categories.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      games = selectedCategoryBooks[0].books;
    }

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <LinearGradient
            colors={["#31323B", "#fff"]}
            start={[1, 0.7]}
            style={{ borderRadius: 20, padding: 10, paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row" }}
            >
              <Image
                source={item.bookCover}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 80 }}
              />

              <View style={{ flex: 1, marginLeft: SIZES.radius, height: "100%", justifyContent: "center", }}>
                <View>
                  <Text
                    style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white, }} >
                    {item.bookName}
                  </Text>
                </View>
              </View>
              <View
                style={{ color: "#fff", justifyContent: "center" }}
                onPress={() => console.log("Bookmark")}
              >
                <Text style={{ color: "#fff", fontSize: 22 }}>40</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: SIZES.radius }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            Últimos Ganadores
          </Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={games}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 0 }}>
      <Menu navigation />
      <ScrollView style={{ marginTop: SIZES.radius, marginHorizontal: SIZES.padding }}>
        <View>{renderButtonSection()}</View>
        <View>{renderMyBookSection(games)}</View>
        <View style={{ marginTop: SIZES.padding }}>
          <View>{renderCategoryData()}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
