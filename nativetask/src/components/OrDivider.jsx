import { StyleSheet, Text, View } from "react-native";

import { Typography } from "./Typography";
import { Colors } from "../config/styles";

export function OrDivider() {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Typography variant="caption" text="Ou" />
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    line: {
        width: '45%',
        backgroundColor: Colors.grey,
        height: 1
    }
});
