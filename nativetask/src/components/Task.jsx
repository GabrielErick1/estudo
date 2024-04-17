import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';

import { Typography } from "./Typography";
import { Colors } from "../config/styles";

export function Task({ title, finished, handleCheck, handleRemove }) {
    return (
        <View style={styles.container}>
            <Checkbox
                onValueChange={handleCheck}
                color={finished ? Colors.purple : Colors.light}
                value={finished}
                style={{ width: 22, height: 22 }}
            />
            <Typography text={title} variant={'subtitle'} numberOfLines={1} />
            <TouchableOpacity onPress={handleRemove}>
                <Typography text={'❌'} variant={'subtitle'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 5,
        borderRadius: 10
    },
});
