import React,{useState, useEffect, useRef} from 'react'
import {Text, ScrollView, View, StyleSheet, Picker, Switch, Button, Alert, Modal, TouchableHighlight,Animated, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker'
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const ReservationComponent = () => {

    const [guests,number] = useState(1);
    const [smoking,smoker] = useState(false);
    const [date,dateFix] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      }, []);
    

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#512DA8',
          });
        }
      
        return token;
      }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
          },
          trigger: { seconds: 2 },
        });
      }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }
    
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
    });

    const handleReservation = () => {
        toggleModal()
        Alert.alert(
            'Your Reservation OK?',
            'Number of guests:'+guests+'\nSmoking:'+smoking+'\nDate:'+date,
            [
                {
                    Text:'Cancel',
                    onPress: async () => await schedulePushNotification(),
                },
                {
                    canceable:false
                }
            ]
        )
        if(!modalVisible){
            number(1);
            smoker(false);
            dateFix('');
        }               
    }

    return (
        <ScrollView>
            <Animatable.View animation="zoomInDown" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number Of Guest</Text>
                    <Picker style={styles.formRow}
                    onValueChange={(itemValue, itemIndex) => {
                        number(itemValue)}} selectedValue={guests}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch 
                        style={styles.fromItem}
                        onValueChange={(item) => smoker(item)}
                        value={smoking}
                        onTintColor='#512DA8'
                    >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={date}
                        mode="date"
                        placeholder="select date and time"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                        }}
                        onDateChange={(date) => dateFix(date.toString())}
                    />
                </View>
                <View style={styles.formRow}>
                        <Button
                        onPress={handleReservation} 
                        title='Reservation'
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
                {/* <View style={styles.centeredView}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={}
                    onRequestClose={() => toggleModal }
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}><Text>Number of Guests</Text>{guests}</Text>
                        <Text style={styles.modalText}>{smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>{date}</Text>
            
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                            setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    </Modal>
            </View> */}
            </Animatable.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20
    },
    formLabel:{
        flex:2,
        fontSize:18,
    },
    fromItem:{
        flex:1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})




