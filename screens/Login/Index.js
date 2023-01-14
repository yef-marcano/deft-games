import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import qs from "qs";
//var qs = require('qs');

import { COLORS, FONTS, SIZES, icons, images } from "../../constants";

import { styles } from "./styles";
const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};

const Login = ({ navigation }) => {
  const profileData = {
    name: "Username",
    point: 200,
  };

  const [profile, setProfile] = React.useState(profileData);

  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");

  function renderHeader(profile) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              Good Morning
            </Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {profile.name}
            </Text>
          </View>
        </View>

        {/* Points */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20,
          }}
          onPress={() => {
            console.log("Point");
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Image
                source={icons.plus_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>

            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >
              {profile.point} point
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", padding: SIZES.padding }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 70,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
          }}
        >
          {/* Claim */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("Claim")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.claim_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}
              >
                Claim
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider />

          {/* Get Point */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("Get Point")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.point_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}
              >
                Get Point
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider />

          {/* My Card */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("My Card")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.card_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  ...FONTS.body3,
                  color: COLORS.white,
                }}
              >
                My Card
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderForm() {
    return (
      <View>
        <Text
          style={{ textAlign: "center", ...FONTS.body1, color: COLORS.white }}
        >
          Deft Games
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          placeholder="Usuario"
          placeholderTextColor={COLORS.white}
          value={usuario}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor={COLORS.white}
          placeholder="Password"
          keyboardType="numeric"
        />
        <View style={{ alignItems: "center", margin: 20 }}>
          <TouchableOpacity
            onPress={() => login()}
            style={{
              backgroundColor: COLORS.white,
              width: 200,
              borderRadius: 10,
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text>Iniciar sesion</Text>
          </TouchableOpacity>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{
                backgroundColor: COLORS.primary,
                width: 200,
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={{ color: COLORS.white }}>Registro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.black, padding: SIZES.padding }}
    >
      {/* Header Section */}
      <View style={{ justifyContent: "center", flex: 1 }}>
        {/*renderHeader(profile)*/}
        {renderForm()}
      </View>
    </SafeAreaView>
  );

  async function login(params) {
    try {
      let requestOptions = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      let body = {
        correo: usuario,
        password: password,
      };

      return axios
        .post(
          "http://52.54.227.142/usuario",
          qs.stringify(body),
          requestOptions
        )
        .then((response) => {
          let result = response.data.status;

          if (result == 200) {
            navigation.navigate("Home");
          } else {
            console.log(response.data.detalle);
            Alert.alert(response.data.detalle);
          }
          return;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {}
  }
};

export default Login;
