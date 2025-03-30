import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import BackButton from "./BackButton";

const Header = ({ title, showBackButton = false, mb = 10 }) => {
    const router = useRouter();
    return (
        <View style={[styles.container, { marginBottom: mb }]}>
            {
                showBackButton && (
                    <View style={styles.backButton}>
                        <BackButton />
                    </View>
                )
            }
            <Text style={styles.title}>{title || ""}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        gap: 10
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    backButton: {
        position: 'absolute',
        left: 0
    }
})
