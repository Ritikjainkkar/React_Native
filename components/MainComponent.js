import React, { Component } from 'react'
import Menu from './MenuComponent';
import { View } from 'react-native';
import DishDetail from './DishDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export class MainComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Stack = createStackNavigator();

        const MenuNavigatorScreen = () => {
            return (
                <Stack.Navigator
                initialRouteName="Menu"
                headerMode="screen"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}
                >
                <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu',}}
                />
                <Stack.Screen name="DishDetail" component={DishDetail}options={{title: 'Dish Detail',}}
                />
            </Stack.Navigator>
        )}
        return (
            <NavigationContainer style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }} >
                <MenuNavigatorScreen/>           
            </NavigationContainer>
            
        )
    }
}

export default MainComponent
