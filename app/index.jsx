import { View, Text, Button } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import ScreenWrapper from "../components/ScreenWrapper";



const index = () => {
    const router = useRouter();
    return (
        <ScreenWrapper>
            <View>  
                <Text>my index</Text>
                <Button title="Welcome" onPress={() => router.push("/welcome")} />
            </View >
        </ScreenWrapper>
    )
}

export default index