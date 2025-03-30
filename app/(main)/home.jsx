import { Text, StyleSheet, View, Button, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRouter } from "expo-router";
import Avatar from "../../components/Avatar";

const Home = () => {

    const { user, setAuth } = useAuth();
    const router = useRouter();

    console.log('user', user);

    // const onLogout = async () => {
    //     const { error } = await supabase.auth.signOut();

    //     if (error) {
    //         console.log(error);
    //         if (error) {
    //             Alert.alert('Sign out', "Error signing out");
    //         }
    //     }
    // }

    return (
        <ScreenWrapper bg='white'>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>LinkUp</Text>
                    <View style={styles.icons}>
                        <Pressable onPress={() => router.push('notifications')}>
                            <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('newPost')}>
                            <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push('profile')}>
                            <Avatar
                            uri={user?.image}
                            size={hp(4.3)}
                            rounded={theme.radius.sm}
                            style={{ borderWidth: 2 }} />
                        </Pressable>
                    </View>
                </View>
            </View>
            {/* <Button title="Logout" onPress={onLogout} /> */}
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: wp(4),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: wp(4),
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold
    },
    avatarImage: {
        height: hp(4.3),
        width: hp(4.3),
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray,
        borderWidth: 3
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    listStyle: {
        paddingHorizontal: wp(4),
        paddingTop: 20,
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text
    },
    pill: {
        position: 'absolute',
        top: -4,
        right: -10,
        height: hp(2.2),
        width: wp(2.2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.roseLight
    },
    pillText: {
        fontSize: hp(1.2),
        color: 'white',
        fontWeight: theme.fonts.bold
    }
})
