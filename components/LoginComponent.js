import React,{useState, Component} from 'react'
import {View, StyleSheet, Button, Image, Platform } from 'react-native'
import { Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { Permissions, ImagePicker, ImageManipulator, Asset } from 'expo';

const Tab = createBottomTabNavigator();

class LoginTab extends Component{

    handleLogin() {
        console.log(this.state)
    }

    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:'',
            remember:false
        }
    }


    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };


    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((err) => console.log('could not save user info',err));
        }else{
            SecureStore.deleteItemAsync('userinfo')
                .catch((err) => console.log('could not save user info',err));
            this.setState({username:'',password:'',remember:false})
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Input 
                placeholder='UserName'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                Style={styles.formInput}
                />
                <Input 
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                Style={styles.formInput}
                />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    Style={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                    onPress={() => this.handleLogin()}
                    title="Log in"
                    color="#512DA8"
                    style={styles.formButton}
                    />
                </View>
            </View>
        )
    }
}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    getImageFromGallery = async () => {
        
        const cameraRollPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!capturedImage.cancelled) {
            
                this.processImage(capturedImage.uri);
            }
        }

    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={{justifyContent:center,}} >
                        <Image 
                            source={this.state.imageUrl}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image} 
                        />
                        <Button 
                        style={{marginLeft:15,}}
                            title='Camera'
                            onPress={this.getImageFromCamera} 
                        />
                        <Button
                        style={{marginLeft:15}}
                            title='Image from Gallary'
                            onPress={this.getImageFromGallery} 
                        />
                    </View>
                    <Input 
                    placeholder='UserName'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    Style={styles.formInput}
                    />
                    <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    Style={styles.formInput}
                    />
                    <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    Style={styles.formInput}
                    />
                    <Input 
                    placeholder='First Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.password}
                    Style={styles.formInput}
                    />
                    <Input 
                    placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.password}
                    Style={styles.formInput}
                    />
                    <Input 
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.password}
                    Style={styles.formInput}
                    />
                    <CheckBox title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        Style={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button 
                        onPress={() => this.handleLogin()}
                        title="Log in"
                        color="#512DA8"
                        style={styles.formButton}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: '#fff'
    },
    formButton: {
        margin: 60
    }
});


const Login = () => {
    
    return(
    <Tab.Navigator 
    style = {{ marginBottom:25 }}
    tabBarOptions = {{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
    }} >
      <Tab.Screen name="Login"  component={LoginTab} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
            />
          ),
        }} />
      <Tab.Screen name="Register" component={RegisterTab} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon
            name='user-plus'
            type='font-awesome'            
            size={24}
          />
          ),
        }} />
    </Tab.Navigator>
    )
}

export default Login;