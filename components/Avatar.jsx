import { Text, StyleSheet, View, Button, Alert } from "react-native";
import React from "react";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { supabase } from "../lib/supabase";
import { Image } from "expo-image";
import { getUserImageSrc } from "../services/imageService";


const Avatar = ({
    uri,
    size = hp(4.5),
    rounded = theme.radius.md,
    style = {}
}) => {
    console.log('[Avatar].[getUserImageSrc] uri: ', getUserImageSrc(uri));
    return (
        <Image
            source={getUserImageSrc(uri).uri}
            transition={100}
            style={
                [styles.avatar, { height: size, width: size, borderRadius: rounded}, style ]}
        />
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
     borderCurve: 'continuous',
     borderColor: theme.colors.darkLight,
     borderWidth: 1   
    }
})