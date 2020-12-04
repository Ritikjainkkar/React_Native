import React, { Component } from 'react'
import Menu from './MenuComponent';
import { View, Image, StyleSheet, Text } from 'react-native';
import DishDetail from './DishDetail';
import Home from './HomeComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ContactComponent from './ContactComponent';
import AboutComponent  from './AboutComponent'
import { Icon } from 'react-native-elements';
import { ReservationComponent } from './ReservationComponent';

import {connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchPromotions , fetchLeaders } from '../redux/ActionCreators';
import FavoritesComponent from './FavoritesComponent';


const mapStateToProps = state => {
    return {
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders: state.leaders,
    };
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    postComment: () => dispatch(postComment()),
})

export class MainComponent extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();
    }

    render() {

        const Stack = createStackNavigator();
        const Drawer = createDrawerNavigator();

        const style = StyleSheet.create({
            container: {
                flex:1,
            },
            drawerHeader: {
                backgroundColor: '#512DA8',
                height:100,
                marginTop:0,
                marginBottom:40,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection:'row'
            },
            drawerHeaderText:{
                marginLeft:5,
                color:'white',
                fontSize: 18,
                fontWeight: 'bold',
            },
            drawerImage:{
                margin:10,
                width:80,
                height:60,
            }
        })

        const HomeNavigator = () => { 

            return(
                <Stack.Navigator
                headerMode="screen"
                screenOptions={{
                    headerShown:false,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
            );
        }

        const MenuNavigator = () => { 

            return(
                <Stack.Navigator
                headerMode="screen"
                screenOptions={{
                    headerShown:false,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}>
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="DishDetail" component={DishDetail} postComment={this.postComment} options={{title: 'Dish Detail',}}/>

            </Stack.Navigator>
            );
        }

        const FavoritesNavigator = () => { 

            return(
                <Stack.Navigator
                headerMode="screen"
                screenOptions={{
                    headerShown:false,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}>
                <Stack.Screen name="Favorites" component={FavoritesComponent} />
                <Stack.Screen name="DishDetail" component={DishDetail} options={{title: 'Dish Detail',}}/>
            </Stack.Navigator>
            );
        }

        const MainNavigatorScreen = () => {

            return (
                <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props}/>}
                initialRouteName="Home"
                headerMode="screen"
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}
                >
                <Drawer.Screen name="Home"  component={HomeNavigator} 
                options={{
                            title:'Home',
                            drawerLabel: 'Home',
                            drawerIcon : ({ tintColor }) => (
                                <Icon
                                    name='home'
                                    type='font-awesome'            
                                    size={24}
                                    color={tintColor}
                              />
                            ),
                        }}/>

                <Drawer.Screen name="Menu" component={MenuNavigator} 
                options={{ 
                            title: 'Menu',
                            drawerLabel: 'Menu',
                            drawerIcon : ({ tintColor }) => (
                                <Icon
                                    name='info-circle'
                                    type='font-awesome'            
                                    size={24}
                                    color={tintColor}
                              />
                            )

                        }}/>

                <Drawer.Screen name="Reservation"  component={ReservationComponent} 
                options={{
                            title:'Reservation',
                            drawerLabel: 'Reservation',
                            drawerIcon : ({ tintColor }) => (
                                <Icon
                                    name='cutlery'
                                    type='font-awesome'            
                                    size={24}
                                    color={tintColor}
                              />
                            ),
                        }}/>

                <Drawer.Screen name="Favorites"  component={FavoritesNavigator} 
                options={{
                            title:'Favorite Dishes',
                            drawerLabel: 'Favorites',
                            drawerIcon : ({ tintColor }) => (
                                <Icon
                                    name='heart'
                                    type='font-awesome'            
                                    size={24}
                                    color={tintColor}
                              />
                            ),
                        }}/>
                <Drawer.Screen name="AboutUs" component={AboutComponent} 
                options={{ 
                            title: 'About us',
                            drawerLabel: 'About Us',
                            drawerIcon: ({ tintColor, focused }) => (
                                <Icon
                                  name='list'
                                  type='font-awesome'            
                                  size={24}
                                  color={tintColor}
                                />
                              ),
                    }}/>
                <Drawer.Screen name="ContactUs" component={ContactComponent} 
                options={{ 
                            title: 'Contact us',
                            drawerLabel: 'Contact Us',
                            drawerIcon: ({ tintColor }) => (
                                <Icon
                                  name='address-card'
                                  type='font-awesome'            
                                  size={22}
                                  color={tintColor}
                                />
                              ),
                }}/>
            </Drawer.Navigator>
        )}

        function CustomDrawerContent(props) {
            return (
              <DrawerContentScrollView 
                style={style.container}>
                <View style={style.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={require('./images/logo.png')} style={style.drawerImage} />
                    </View>
                    <View style={{flex:2}}>
                        <Text style={style.drawerHeaderText}>
                            Restorent Con Fusion
                        </Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            );
          }

        return (
            <NavigationContainer style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }} >
                <MainNavigatorScreen/>           
            </NavigationContainer>
            
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainComponent)
