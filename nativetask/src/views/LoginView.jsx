import { Alert, StyleSheet, View } from "react-native";

import { Button, Input, OrDivider, Typography } from "../components";
import { Colors } from "../config/styles";

export function LoginView({ navigation }) {
    return (
        <View style={styles.container}>
            <Typography text="Bem vindo!" variant="title" />
            <Typography
                variant="subtitle"
                text="Entre na sua conta para acessar nossa plataforma."
            />
            <View style={styles.form}>
                <Input placeholder="E-mail" />
                <Input placeholder="Senha" secureTextEntry />
                <Button
                    title={"Entrar"}
                    onPress={() => Alert.alert("Entrar")}
                />
            </View>
            <OrDivider />
            <Typography
                text="Criar uma conta"
                variant="link"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    form: {
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
});
