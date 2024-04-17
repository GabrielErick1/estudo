import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import { Colors } from "./config/styles";
import { Routes } from "./routes";
import { UserProvider } from "./api/UserContext";

function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <UserProvider>
                <Routes />
            </UserProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: Platform.OS === "android" ? 45 : 0,
        paddingHorizontal: 20,
    },
});

export default registerRootComponent(App);
