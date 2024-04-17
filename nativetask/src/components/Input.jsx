import { StyleSheet, TextInput } from "react-native";

import { Colors } from "../config/styles";

export function Input({ ...props }) {
    return (
        <TextInput
            {...props}
            placeholderTextColor={Colors.grey}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.secondary,
        padding: 20,
        borderRadius: 10,
        fontSize: 20,
        color: Colors.light,
        marginBottom: 10,
        width: '100%',
    },
});
