import { StatusBar, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import {wp, hp} from "../helpers/common";
import {theme} from "../constants/theme";
import Button from "../components/Button";

const Welcome = () => {
    return (
        <ScreenWrapper bg="white">
           <StatusBar style="dark" />
           <View style={styles.container}>
               {/*Main content*/}
               <View style={styles.mainContent}>
                   {/*Welcome image*/}
                   <Image 
                       style={styles.welcomeImage} 
                       resizeMode="contain" 
                       source={require("../assets/images/welcome.png")} 
                   />

                   {/*Title*/}
                   <View style={{gap: 20}}>
                       <Text style={styles.title}>LinkUp!</Text>
                       <Text style={styles.punchline}>Where every thought finds a home and every image tells a story</Text>
                   </View>
               </View>

               {/*Footer*/}
               <View style={styles.footer}>
                   <Button
                    title="Getting Started"
                    buttonStyle={{marginHorizontal: wp(3)}}
                    onPress={() => {}}
                   />
               </View>
           </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: wp(4)
    },
    mainContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeImage: {
        width: wp(100),
        height: hp(30),
        alignSelf: "center",
        marginBottom: hp(4)
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fonts.extraBold,
        textAlign: "center",
        color: theme.colors.text
    },
    punchline: {
        fontSize: hp(1.7),
        textAlign: "center",
        paddingHorizontal: wp(10),
        color: theme.colors.text
    },
    footer: {
        gap: 30,
        width: '100%',
        paddingBottom: hp(6) // Add padding at the bottom
    }
})