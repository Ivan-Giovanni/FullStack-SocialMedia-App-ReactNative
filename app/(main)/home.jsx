import { Text, StyleSheet, View, Button, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

const Home = () => {

    const {user, setAuth} = useAuth();

    console.log('user', user);

    const onLogout = async () => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            Alert.alert('Logout', error.message);
            return;
        }
    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button title="Logout" onPress={onLogout} />
        </ScreenWrapper>
    )
}

export default Home

const styles = StyleSheet.create({
    
})
