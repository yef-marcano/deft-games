import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    LogBox 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertBug } from "../helper/Alert";
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { mainApi } from "../services";
import Menu from '../components/Menu';

import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';

import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../constants';

// const LineDivider = () => {
//     return (
//         <View style={{ width: 1, paddingVertical: 18 }}>
//             <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
//         </View>
//     )
// }

const Home = ({navigation}) => {

    const [profile, setProfile] = React.useState(dummyData.profileData);
    const [myBooks, setMyBooks] = React.useState(dummyData.myBooksData);
    const [categories, setCategories] = React.useState(dummyData.categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);
    const [userdata, setUserdata] = React.useState({});
    const [games, setGames] = React.useState([]);


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    
    useEffect(() => {
        usuario()
        juegos()
    }, [])

    async function usuario() {
        let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        setUserdata(obj)
        //console.log(userdata);
    }
    async function juegos() {
        try {
            //setVisible(true);
            console.log("HOALALALAL");
            //let datos = { correo: usuario, password: password, }
            await mainApi('', 'juegos', 'GET')
                .then(res => {
                    console.log(res.data);
              //      setVisible(false);
                   // console.log(res.data);
                    if (res.data.status === 200) {
                        //console.log(res.data.detalle);
                        setGames(res.data.detalle)
                        return
                    } else {
                        AlertBug(res.data.detalle)
                    }
                })
        } catch (error) { }
    }

    function renderButtonSection() {
        var games = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)
    
        if (selectedCategoryBooks.length > 0) {
            games = selectedCategoryBooks[0].books
        }
    
        const renderItem = ({ item }) => {
            return (    
                <View style={{ marginVertical: SIZES.base, width: SIZES.width/1.3, marginRight: 20 }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                    >
                        {/* Book Cover */}
                        <Image
                            source={item.bookCover}
                            resizeMode='cover'
                            style={{ width: '100%', height: 120, borderRadius: 15}}
                        />
    
                        <View style={{ flex: 1, marginLeft: SIZES.radius, height: '100%', justifyContent: 'center', }}>
                            {/* aqui texto */}
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Torneos Destacados</Text>
                <View style={{  height: 150, width: SIZES.width}}>
                
                <FlatList
                    data={games}
                    renderItem={renderItem}
                    horizontal
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
                </View>
            </View>
        )
    }

function renderMyBookSection(juegos) {

    const renderItem = ({ item, index }) => {
        console.log(item);
        return (
            <TouchableOpacity
                key={index}
                style={{
                    flex: 1,
                    //marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius
                }}
                onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}
            >
                {/* Book Cover */}
                <View style={{ flexDirection: 'column', height: 100, backgroundColor: COLORS.lightGray, borderRadius: SIZES.radius, padding: 5, height: 160}}>
                <Image
                    source={{uri:item.img}}
                    resizeMode="cover"
                    style={{
                        width: 100,
                        height: 130,
                        borderRadius: 10
                    }}
                />
                    <View>
                        <Text style={{color:COLORS.white, }}> {item.name}</Text>
                    </View>
                    </View>
                

                {/* Book Info 
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={icons.clock_icon}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.lastRead}</Text>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.completion}</Text>
                    </View>*/}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Todos los juegos</Text>

                {/*<TouchableOpacity
                    onPress={() => console.log("See More")}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>Ver más</Text>
                </TouchableOpacity>*/}
            </View>

            {/* Books */}
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
    )
}

function renderCategoryHeader() {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, marginRight: SIZES.padding }}
                onPress={() => setSelectedCategory(item.id)}
            >
                {
                    selectedCategory == item.id &&
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.categoryName}</Text>
                }
                {
                    selectedCategory != item.id &&
                    <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{item.categoryName}</Text>
                }
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
            <FlatList
                data={categories}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                horizontal
            />
        </View>
    )
}

function renderCategoryData() {
    var games = []

    let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

    if (selectedCategoryBooks.length > 0) {
        games = selectedCategoryBooks[0].books
    }

    const renderItem = ({ item }) => {
        return (    
            <View style={{ marginVertical: SIZES.base, }}>
            <LinearGradient
                // Background Linear Gradient
              colors={['#31323B', '#fff']}
              start={[1, 0.7]}
              style={{borderRadius: 20, padding: 10, paddingHorizontal: 20}}
              >
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row' }}
                /*onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}*/
                >
                    {/* Book Cover */}
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{ width: 80, height: 80, borderRadius: 80 }}
                    />

                    <View style={{ flex: 1, marginLeft: SIZES.radius, height: '100%', justifyContent: 'center', }}>
                        {/* Book name and author */}
                        <View>
                            <Text style={{paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                        </View>
                    </View>
                {/* Bookmark Button */}
                <View
                    style={{ color:'#fff',justifyContent: 'center', }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Text style={{color:'#fff', fontSize:22}}>40</Text>
                </View>
                </TouchableOpacity>

            </LinearGradient>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, marginTop: SIZES.radius }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Últimos Ganadores</Text>

                {/*<TouchableOpacity
                    onPress={() => console.log("See More")}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>Ver más</Text>
                </TouchableOpacity>*/}
            </View>
            <SafeAreaView style={{flex: 1}}> 
            <FlatList
                data={games}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
            />
            </SafeAreaView>
        </View>
    )
}

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: 0 }}>
        <Menu navigation/>
        {/*<NavBar left={


            <Feather name="menu" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
        } 
        

        title="200 POINS"
        right={
            <FontAwesome5 name="piggy-bank" size={24} color="black" />
        } />*/}
        {/* Header Section */}

        {/* Body Section */}
        <ScrollView style={{ marginTop: SIZES.radius , marginHorizontal: SIZES.padding}}>
            {/* Books Section */}
            <View> 
            {renderButtonSection()}
            </View>
            <View>
                {renderMyBookSection(games)}
            </View>

            {/* Categories Section */}
            <View style={{ marginTop: SIZES.padding }}>
                <View>
                    {/*renderCategoryHeader()*/}
                </View>
                <View>
                    {renderCategoryData()}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
)

}

export default Home;