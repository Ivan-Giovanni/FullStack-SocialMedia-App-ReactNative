import { Text, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import Input from "../components/Input";
import { hp, wp } from "../helpers/common";
import { useState } from "react";
import { useRef } from "react";
import Button from "../components/Button";
import { Alert } from "react-native";


const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const nameRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async() => {
        if(!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert('SignUp', 'Please fill all fields');
            return;
        }

        // Good to go
    }


    return (
        <ScreenWrapper bg='white'>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                {/*Welcome Text*/}
                <View>
                    <Text style={styles.welcomeText}>Let's </Text>
                    <Text style={styles.welcomeText}>Get Started</Text>
                </View>

                {/*Form*/}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Please fill the details to created an account</Text>
                    <Input
                        icon={
                            <Icon name="user" strokeWidth={1.6} size={26} />
                        }
                        placeholder="Enter your name"
                        onChangeText={value => {nameRef.current = value}}
                    />
                    <Input
                        icon={
                            <Icon name="mail" strokeWidth={1.6} size={26} />
                        }
                        placeholder="Enter your email"
                        onChangeText={value => {emailRef.current = value}}
                    />
                    <Input
                        icon={
                            <Icon name="lock" strokeWidth={1.6} size={26} />
                        }
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={value => {passwordRef.current = value}}
                    />

                    {/*Login Button*/}
                    <Button
                        title="Sign Up"
                        onPress={onSubmit}
                        loading={loading}
                    />
                </View>

                {/*Footer*/}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <Pressable onPress={() => router.push('login')}>
                        <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
    },
    form: {
        gap: 25,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
});
