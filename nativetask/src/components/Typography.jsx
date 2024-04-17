import { StyleSheet, Text } from "react-native";

import { Colors } from "../config/styles";

export function Typography({ variant, text, ...props }) {
    return (
        <Text style={styles[`${variant}`]} {...props}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: Colors.light,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20,
        color: Colors.light,
        textAlign: 'center',
        maxWidth: '80%',
    },
    caption: {
        fontSize: 16,
        color: Colors.grey,
    },
    button: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light,
        textAlign: 'center'
    },
    link: {
        fontSize: 16,
        color: Colors.grey,
        textDecorationLine: 'underline'
    }
});
