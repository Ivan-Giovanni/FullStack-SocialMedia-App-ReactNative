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
import { supabase, testSupabaseConnection } from "../lib/supabase";
import { setAuth } from "../contexts/AuthContext";
import { getUserData } from "../services/userService";

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Login', 'Please fill all fields');
            return;
        }

        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();

        setLoading(true);

        try {
            console.log('Testing Supabase connection...');
            const isConnected = await testSupabaseConnection();
            if (!isConnected) {
                Alert.alert('Connection Error', 'Could not connect to Supabase. Please check your internet connection and try again.');
                return;
            }
            console.log('Supabase connection test passed!');

            console.log('Starting login...', { email });

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            console.log('Login response:', { data, error });

            if (error) {
                console.error('Login error:', error);
                Alert.alert('Login', error.message);
                return;
            }

            if (data?.user) {
                const userData = {
                    ...data.user,
                    name: data.user.user_metadata?.name || ''
                };

                setAuth(userData);
                Alert.alert('Success', 'Welcome back!');
                router.replace('/(main)');
            }

        } catch (error) {
            console.error('Unexpected error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenWrapper bg='white'>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />

                {/*Welcome Text*/}
                <View>
                    <Text style={styles.welcomeText}>Hey, </Text>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                </View>

                {/*Form*/}
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Please login to continue</Text>
                    <Input
                        icon={
                            <Icon name="mail" strokeWidth={1.6} size={26} />
                        }
                        placeholder="Enter your email"
                        onChangeText={value => { emailRef.current = value }}
                    />
                    <Input
                        icon={
                            <Icon name="lock" strokeWidth={1.6} size={26} />
                        }
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={value => { passwordRef.current = value }}
                    />
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>

                    {/*Login Button*/}
                    <Button
                        title="Login"
                        onPress={onSubmit}
                        loading={loading}
                    />
                </View>

                {/*Footer*/}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <Pressable onPress={() => router.push('signUp')}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login;

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
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
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
