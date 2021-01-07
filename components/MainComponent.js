import React, { Component } from 'react'
import Menu from './MenuComponent';
import { View, Image, StyleSheet, Text, ToastAndroid } from 'react-native';
import DishDetail from './DishDetail';
import Home from './HomeComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ContactComponent from './ContactComponent';
import AboutComponent  from './AboutComponent'
import { Icon } from 'react-native-elements';
import ReservationComponent  from './ReservationComponent';
import LoginComponent from './LoginComponent'
import {connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchPromotions , fetchLeaders } from '../redux/ActionCreators';
import FavoritesComponent from './FavoritesComponent';
import NetInfo from "@react-native-community/netinfo";



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

        NetInfo.addEventListener(state => {
            switch (state.type) {
                case 'none':
                    ToastAndroid.show('You are now offline!', ToastAndroid.SHORT);
                    break;
                case 'wifi':
                    ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.SHORT);
                    break;
                case 'cellular':
                    ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.SHORT);
                    break;
                case 'unknown':
                    ToastAndroid.show('You now have unknown connection!', ToastAndroid.SHORT);
                    break;
                default:
                    break;
              }
          });
    }

    componentWillUnmount() {
        NetInfo.removeEventListener();
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

        const LoginNavigator = () => { 

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
                <Stack.Screen name="Log in" component={LoginComponent} />
            </Stack.Navigator>
            );
        }

        const ReservationNavigator = () => { 

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
                <Stack.Screen name="Reservation" component={ReservationComponent} />
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
                headerMode="screen"
                drawerStyle={{
                    backgroundColor: '#c6cbef',
                  }}
                screenOptions={{
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: "#512DA8" },
                    headerTitleStyle: {
                        color: "#fff"            
                    }
                }}
                >
                <Drawer.Screen name="Log in"  component={LoginNavigator} 
                options = {{
                        title:'Logg in',
                        drawerLabel: 'Log in',
                        drawerIcon : ({ tintColor }) => (
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color={tintColor}
                            />
                        ),
                    }}/>
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

                    <Drawer.Screen name="Reservation"  component={ReservationNavigator} 
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
            <NavigationContainer style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigatorScreen/>           
            </NavigationContainer>
            
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainComponent)
