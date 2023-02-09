import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Menu from '../../components/Menu';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FullLoading from 'react-native-full-loading'
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import {
    styles
} from './styles';




const Monedero = ({ navigation }) => {

    const [userdata, setUserdata] = React.useState({});
    const [visible, setVisible] = React.useState(false);


    React.useEffect(() => {
        usuario()
    }, [])

    async function usuario() {
        let user = await AsyncStorage.getItem('@user_data');
        const obj = JSON.parse(user);
        setUserdata(obj)
        console.log(userdata);
    }

    async function logout() {
        setVisible(true)
        await AsyncStorage.removeItem('@user_data');
        navigation.navigate('Login')
        setVisible(false)
    }


    const profileData = {
        name: 'Username',
        point: 200
    }

    const bookOtherWordsForHome = {
        id: 1,
        bookName: "Free Fire",
        bookCover: images.otherWordsForHome,
        rating: 4.5,
        language: "Eng",
        pageNo: 341,
        author: "111dots Studio",
        genre: [
            "Aventura", "Shooter"
        ],
        readed: "12k",
        description: "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: "#000"
    }

    const bookTheMetropolis = {
        id: 2,
        bookName: "UNO",
        bookCover: images.theMetropolist,
        rating: 4.1,
        language: "Eng",
        pageNo: 272,
        author: "Medrick",
        genre: [
            "Cartas"
        ],
        readed: "13k",
        description: "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
        backgroundColor: "rgba(247,239,219,0.9)",
        navTintColor: "#000"
    }

    const bookTheTinyDragon = {
        id: 3,
        bookName: "Clash Royale",
        bookCover: images.theTinyDragon,
        rating: 3.5,
        language: "Eng",
        pageNo: 110,
        author: "Supercell",
        genre: [
            "Aventura"
        ],
        readed: "13k",
        description: "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    }

    const myBooksData = [
        {
            ...bookOtherWordsForHome,
            completion: "75%",
            lastRead: "3d 5h",

        },
        {
            ...bookTheMetropolis,
            completion: "23%",
            lastRead: "10d 5h",

        },
        {
            ...bookTheTinyDragon,
            completion: "10%",
            lastRead: "1d 2h",

        }
    ]

    const categoriesData = [
        {
            id: 1,
            categoryName: "Social",
            books: [
                bookOtherWordsForHome, bookTheMetropolis, bookTheTinyDragon
            ]
        },
        {
            id: 2,
            categoryName: "Mis juegos",
            books: [
                bookTheMetropolis
            ]
        },
        {
            id: 3,
            categoryName: "Partidas",
            books: [
                bookTheTinyDragon
            ]
        },
    ]

    const [profile, setProfile] = React.useState(profileData);
    const [myBooks, setMyBooks] = React.useState(myBooksData);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);

    function renderHeader(profile) {
        return (
            {/*<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                
                <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{userdata.nombre}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    onPress={() => logout()}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.body3 }}>CERRAR SESION</Text>
                    </View>
                </TouchableOpacity>
            </View>*/}
        )
    }

    function renderButtonSection() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Claim")}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.claim_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Reclamar</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point 
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Get Point")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.point_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Comprar BUSD</Text>
                        </View>
                    </TouchableOpacity>*/}

                    {/* Divider 
                    <LineDivider />*/}

                    {/* My Card */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("My Card")}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.card_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Mi perfil</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderMyBookSection(myBooks) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                /*onPress={() => navigation.navigate("BookDetail", {
                    book: item
                })}*/
                >
                    {/* Book Cover */}
                    <Image
                        source={item.bookCover}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 20
                        }}
                    />

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
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Mis Juegos</Text>

                    <TouchableOpacity
                        onPress={() => console.log("See More")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>Ver más</Text>
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
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
        var books = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            books = selectedCategoryBooks[0].books
        }

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
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
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                            </View>

                            {/* Book Info */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                <Image
                                    source={icons.page_filled_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre.includes("Aventura") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Aventura</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Shooter") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Shooter</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Cartas") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Cartas</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    const LineDivider = () => {
        return (
            <View style={{ width: 50, paddingVertical: 5 }}>
                <View
                    style={{
                        flex: 1,
                        borderTopColor: COLORS.primary,
                        borderTopWidth: 1,
                    }}
                ></View>
            </View>
        );
    };

    function cardPack() {
        return (
            <View style={{ flexDirection: 'row', paddingBottom: 100 }}>
                <TouchableOpacity>
                    <View style={{
                        margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
                        paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>1250</Text>
                            <Image source={images.coindeft} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>D-Coins</Text>
                        </View>
                        {LineDivider()}
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>$4,99</Text>

                        <View style={{ position: 'absolute', bottom: -25 }}>
                            <LinearGradient
                                colors={['#FEA800', '#FEA800']}
                                start={[1, 1]}
                                style={styles.buttonPack}>
                                <Text>Comprar</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                        margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
                        paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>1250</Text>
                            <Image source={images.coindeft} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>D-Coins</Text>
                        </View>
                        {LineDivider()}
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>$19,99</Text>

                        <View style={{ position: 'absolute', bottom: -25 }}>
                            <LinearGradient
                                colors={['#FEA800', '#FEA800']}
                                start={[1, 1]}
                                style={styles.buttonPack}>
                                <Text>Comprar</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{
                        margin: 5, borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10,
                        paddingHorizontal: 10, alignItems: 'center', paddingVertical: 25
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>1250</Text>
                            <Image source={images.coindeft} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>D-Coins</Text>
                        </View>
                        {LineDivider()}
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>$49,99</Text>

                        <View style={{ position: 'absolute', bottom: -25 }}>
                            <LinearGradient
                                colors={['#FEA800', '#FEA800']}
                                start={[1, 1]}
                                style={styles.buttonPack}>
                                <Text>Comprar</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <>
            <FullLoading visible={visible} text={'Cerrando sesión'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.theme }}>

                <Menu back />
                <ScrollView style={{  marginHorizontal: SIZES.padding }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={images.logologin} />
                    </View>
                    <View>
                        <View>
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Reclama tus recompensas</Text>
                            {/*renderCategoryHeader()*/}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <LinearGradient
                                colors={['#26073D', '#7522B0']}
                                start={[1, 0.7]}
                                style={styles.button}>
                                <Text style={{ ...FONTS.h1, color: COLORS.white }}>Deft Coins</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ ...FONTS.h1, color: COLORS.white }}>1250</Text>
                                    <Image source={images.coindeft} />
                                </View>

                                <TouchableOpacity >
                                    <LinearGradient
                                        colors={['#FEA800', '#FEA80091']}
                                        start={[1, 0.7]}
                                        style={styles.buttonReclamo}>
                                        <Text>Reclamar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={{ color: '#979797' }}> MAS INFO ?</Text>
                                </TouchableOpacity>


                            </LinearGradient>

                            <Text style={{ ...FONTS.h2, color: COLORS.primary, marginVertical: 20 }}>¡Consigue tu pack y compite!</Text>
                            {cardPack()}

                            {/*renderCategoryData()*/}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Monedero;