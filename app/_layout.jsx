import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { getUserData, setUserData } from "../services/userService";





const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

const MainLayout = () => {
    const {setAuth, setUserData} = useAuth();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if(session) {
                setAuth(session?.user);
                updateUserData(session?.user);
                router.replace('/home');
            }
            else {
                setAuth(null);
                router.replace('welcome');
            }
          })
        }, [])   


        const updateUserData = async (user) => {
            let res = await getUserData(user?.id);
            if (res.success) {
                setUserData(res.data);
            }
        }
    
    return (
        <Stack 
        screenOptions={{
            headerShown: false
        }}
        />
    )
}

export default _layout