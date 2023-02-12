import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { Button, Accordion, Block  } from 'galio-framework';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FullLoading from 'react-native-full-loading'

import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { Feather,FontAwesome5  } from '@expo/vector-icons'; 

import  Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';


const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const Ayuda = ({ navigation }) => {

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
    const data = [
        { title: "Que es Deft Game", content: "Somos una aplicación que te permite ganar recompensas en criptomonedas, jugando a tus videojuegos móviles favoritos a través de torneos o partidas 1vs1. Solo tienes que añadir tus cuentas de juego, elegir o crear partida y empezar a ganar! Importante: Deft Games no está respaldado, directamente afiliado, mantenido o patrocinado por Epic Games, Activision Blizzard, Supercell, Sony, Xbox, Playstation, Microsoft, Electronic Art, Apple inc. o Google. Todos los contenidos, los títulos de los juegos, los nombres comerciales y / o la imagen comercial, las marcas comerciales, el material gráfico y las imágenes asociadas son marcas comerciales y / o material protegido por derechos de autor de sus respectivos propietarios."
        /*, 
          icon: {
            name: 'keyboard-arrow-up',
            family: 'material',
            size: 16,
          }*/ 
       },
        { title: "¿Quién puede participar?", content: "Para jugar en cualquier tipo de competición en deft games, tienes que ser mayor de 18 años." },
        { title: "¿Cómo jugar?", content: "Puedes competir tanto en torneos con muchos jugadores, como en partidas 1vs1 o mini torneos. No está permitido jugar competiciones de otra región que no sea la tuya, tampoco podrás jugar con emulador de PC. No podrás jugar con 2 cuentas al mismo tiempo." },
        { title: "¿Es seguro jugar en Deft Games?", content: "En Deft Games nos tomamos la seguridad muy en serio. Por una parte tu información se encuentra cifrada para garantizar que nunca vayan a caer en malas manos. Por otro parte, trabajamos con BUSD de binance, es un exchange de criptomonedas regulado a nivel mundial con un sistema de seguridad de alto nivel." },
        { title: "¿Cómo vinculo mi cuenta de juego?", content: "Dentro de la sección de cada videojuego, tienes que añadir el usuario / ID de tu cuenta en el juego y así accederás a todas las competiciones (1vs1 o torneos)." },
        { title: "¿Puedo cambiar una cuenta de juego que ya tenga vinculada?", content: "Un usuario no puede volver a vincular otra cuenta diferente del mismo juego. Pero si es un caso justificado (Has vinculado mal tu cuenta, la has perdido, te han baneado del juego, etc..) puedes hablar con nuestro equipo de Soporte Técnico y te ayudarán a vincular tu nueva cuenta. No está permitido vincular cuentas SMURF, debes vincular la cuenta al máximo nivel." },
        { title: "Si me roban la cuenta ¿Qué tengo que hacer y qué pasa con mis criptomonedas?", content: "Si detectas actividades irregulares en tu cuenta ya sea en tus partidas, como en tus transacciones, contacta lo antes posible con Soporte para que te ayuden a recuperarla. Recuerda que solo puede haber una persona por cuenta, por lo que esta no puede ser compartida." },
        { title: "Mi cuenta ha sido baneada, ¿podré volver algun dia?", content: "No, no hay ninguna manera de volver. En esto tenemos que ser contundentes, queremos tener una comunidad competitiva pero sana y desde luego las trampas no están permitidas. La toxicidad es penada seriamente dentro de nuestra app, es algo que no toleramos." },
        { title: "¿Por qué debemos añadir los datos específicos de juegos?", content: "Es necesario que conozcamos tu ID y ciertos datos adicionales de cada juego para comprobar las estadísticas de las partidas que computarán en las competiciones." }
      ];

      
    const data2 = [
        { title: "¿Qué son las partidas?", content: "Una partida es una competición de 1vs1. Ejemplo: Carlos se quiere jugar 10 D-coins en una partida de Clash Royale, y encuentra a Ramón que también quiere. Los dos juegan una partida y el que gane se lleva el bote. ¡Así de simple!"
        /*, 
          icon: {
            name: 'keyboard-arrow-up',
            family: 'material',
            size: 16,
          }*/ 
       },
        { title: "¿Qué tengo que hacer para jugar?", content: "1. Ves a la sección de Compite y busca tu juego y plataforma. 2. Encuentra la partida que prefieras e inscríbete, o crea la tuya y espera rival. 3. Una vez que tengas rival, agregaros por el chat y ¡a jugar!" },
        { title: "¿Cómo creo una partida?", content: "Ve a la sección de Compite y pulsa el botón que aparece abajo. Selecciona tu juego y plataforma, la cantidad a disputar y listo. Se creará la partida, que permanecerá 30 minutos en el lobby que es el tiempo en el que debes estar disponible por si alguien acepta. Una vez aceptada por otro jugador, les notificaremos y tendrán 5 minutos para prepararse y dejar lo que están haciendo ya que es momento de competir y ganar!." },
        { title: "¿Puedo jugar partidas contra amigos?", content: "¡Sí! Al crear una partida puedes elegir que sea privada y asignarle una contraseña que podrás compartir por otro lado a quien quieras que juegue contigo. " },
        { title: "Empieza la partida (1vs1), ¿Y ahora qué?", content: "1. Chatea con tu rival para comenzar a jugar la partida que te diga las normas de la sección ¿Cómo funciona? 2. Tenéis un tiempo limitado para jugar la partida dependiendo del juego. ¡Compite al máximo! 3. Una vez transcurrido el tiempo, el resultado aparecerá automáticamente en la App." },
        { title: "¿He empatado o no se ha jugado al final?", content: "No hay de qué preocuparse, si no se ha podido jugar o habrán empatado les devolvemos los ónix a ambos jugadores. Así podrán echar otra rápidamente." }
      ];

      
    const data3 = [
        { title: "¿Cómo funcionan los torneos?", content: "Competición tradicional por rondas. Se juega una ronda tras otra hasta llegar a la final en el mismo día. Si continúas en el torneo, deberás estar atento para jugar la siguiente ronda.        "
        /*, 
          icon: {
            name: 'keyboard-arrow-up',
            family: 'material',
            size: 16,
          }*/ 
       },
        { title: "¿Qué tengo que hacer una vez inscrito?", content: `1. Esperar a recibir una notificación nuestra que te informará de la confirmación del torneo.
        2. Busca a tu rival y juega contra él en el límite de tiempo que tenéis disponible para jugar. Comunicate con tu rival por el chat para más detalles
        3. Esperar hasta el final del tiempo y los resultados del enfrentamiento se cargarán automáticamente
        4. Si te has clasificado para la siguiente ronda, tenga en cuenta la hora de inicio de la siguiente ronda.
        ` },
        { title: "¿Cómo funciona el modelo de premios?", content: "Hay torneos de todo tipo, algunos en los que el primero se lleva todo el bote de D-coins o torneos en los que en segunda ronda ya ganas D-coins por seguir avanzando." },
        { title: "¿Qué pasa si empato contra mi rival?", content: "Para no entorpecer el ritmo del torneo y seguir con su desarrollo, se decidirá un ganador al azar y al otro jugador se le compensará devolviéndole las D-coins de la inscripción (si este jugador no hubiera ganado ningún premio del torneo)." },
        { title: "¿Cuál es el plazo de inscripción a un torneo?", content: "Debes apuntarte 15 minutos antes de la hora de inicio del torneo." },
        { title: "¿Torneo cancelado?", content: "Para poder seguir adelante con un torneo debemos de contar con un mínimo de jugadores. Siempre te avisaremos con 15 minutos de antelación si se celebrará o no el torneo." }
      ];
      const data4= [
          { title: "¿Cómo consigo D-coins para competir en partidas (1vs1) y torneos?", content: "Es necesario que te hagas usuario premium en Deft Games, y así podrás disfrutar de torneos exclusivos en cualquier videojuego. Para poder competir en partidas 1vs1, tendrás que recargar un mínimo de D-coins para que puedas usarlas en este formato."
          /*, 
            icon: {
              name: 'keyboard-arrow-up',
              family: 'material',
              size: 16,
            }*/ 
         },
          { title: "¿Cómo gano D-coins?", content: `¡Ganando! Podrás competir en partidas y torneos para divertirte, conseguir prestigio y acumular D-coins día a día. Cualquier tipo de comportamiento fraudulento, como jugar partidas sin que se disputen, regalar monedas o irregularidades similares serán motivos de baneo automático. 
          ` },
          { title: "¿Cómo retiro mis D-coins?", content: "Cuando entras en el monedero, tienes un botón que estará activo para que puedas hacer claim de lo que has acumulado hasta el momento, y lo mejor es que podrás recibir tus recompensas en minutos." },
          { title: "¿Puedo retirar cualquier wallet?", content: "No, solo podrás hacer retiros de tu cuenta a la wallet que hayas añadido. Esta wallet no la podrás cambiar, así que asegúrate de que la wallet que añadirás a tu cuenta." }
        ];
  

    function renderCategoryHeader() {

        return (
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
                <Text style={{color:COLORS.white, fontSize: SIZES.h1}}>Preguntas Generales</Text>
                <Block style={{paddingBottom: 20}} >
                <Accordion  dataArray={data} 
                headerStyle={{fontSize: 20}}
                style={{ width: '100%', marginTop:SIZES.padding, fontSize: 20}}
                listStyle={{ fontSize:20}}
                 />
                </Block>
                
                <Text style={{color:COLORS.white, fontSize: SIZES.h1}}>Partidas</Text>
                <Block style={{paddingBottom: 20}}>
                <Accordion  dataArray={data2} 
                headerStyle={{fontSize: 20}}
                style={{ width: '100%', marginTop:SIZES.padding, fontSize: 20}}
                listStyle={{ fontSize:20}}
                 />
                </Block>
                
                <Text style={{color:COLORS.white, fontSize: SIZES.h1}}>Torneo</Text>
                <Block style={{paddingBottom: 20}}>
                <Accordion  dataArray={data3} 
                headerStyle={{fontSize: 20}}
                style={{ width: '100%', marginTop:SIZES.padding, fontSize: 20}}
                listStyle={{ fontSize:20}}
                 />
                </Block>
                
                <Text style={{color:COLORS.white, fontSize: SIZES.h1}}>DEFT - COINS</Text>
                <Block style={{paddingBottom: 20}}>
                <Accordion  dataArray={data4} 
                headerStyle={{fontSize: 20}}
                style={{ width: '100%', marginTop:SIZES.padding, fontSize: 20}}
                listStyle={{ fontSize:20}}
                 />
                </Block>
            </View>
        )
    }

    function renderCategoryData() {

        return (
            <View style={{ backgroundColor: COLORS.white, alignItems:'center' }}>
                <Button round uppercase color={COLORS.primary}>HACERSE PREMIUM</Button>
            </View>
        )
    }

    return (
        <>
        <FullLoading visible={visible} text={'Cerrando sesión'} />

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background , paddingTop: 0}}>
       
            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius}}>
                <View style={{ marginTop: SIZES.padding, paddingBottom: 100 }}>
                    <View>
                        {renderCategoryHeader()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

export default Ayuda;