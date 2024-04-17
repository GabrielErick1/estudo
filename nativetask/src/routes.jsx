import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginView, RegisterView, TasksView } from './views';

const Stack = createNativeStackNavigator();

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={{
                    headerShown: false,
                    animation: 'ios'
                }}
            >
                <Stack.Screen name='Login' component={LoginView} />
                <Stack.Screen name='Register' component={RegisterView} />
                <Stack.Screen name='Tasks' component={TasksView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
