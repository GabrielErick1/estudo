import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

import { Typography } from "./Typography";
import { Colors } from "../config/styles";

export function Button({ title, loading, ...props }) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: loading ? Colors.light : Colors.purple }]}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size={35} color={Colors.primary} />
            ) : (
                <Typography text={title} variant="title" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    }
})
