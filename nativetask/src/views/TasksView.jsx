import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Task, Input, Button, Typography } from '../components';

export function TasksView() {
    const [tasks, setTasks] = useState([
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        },
        {
            title: 'Teste',
            finished: false
        }
    ]);

    return (
        <View style={styles.container}>
            <Typography variant={'title'} text={'Crie e organize as suas tarefas'} />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                keyExtractor={(_, index) => index}
                data={tasks}
                renderItem={({ item, index }) => (
                    <Task
                        title={item.title}
                        finished={item.finished}
                        handleCheck={() => { }}
                        handleRemove={() => { }}
                    />
                )}
            />
            <View style={styles.form}>
                <Input placeholder="Insira o nome da tarefa" />
                <Button title={'Adicionar'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    flatlist: {
        width: '100%',
        marginVertical: 20,
    },
    form: {
        width: '100%',
    },
});
