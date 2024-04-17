import React, { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input, OrDivider, Typography } from "../components";
import { Colors } from "../config/styles";
import { UserContext } from "../api/UserContext";

export function RegisterView({ navigation }) {
    const { addUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleCreateAccount = async () => {
        await addUser("gabrielerick@gmail.com", "123456789", "123456789");
    };

    return (
        <View style={styles.container}>
            <Typography
                variant="subtitle"
                text="Crie uma conta para acessar nossa plataforma."
            />
            <View style={styles.form}>
                <Input
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirmar senha"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <Button title={"Criar"} onPress={handleCreateAccount} />
            </View>
            <OrDivider />
            <Typography
                text="Já tenho uma conta"
                variant="link"
                onPress={() => navigation.navigate("Login")}
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
