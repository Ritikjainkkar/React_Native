import {Component} from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import React from 'react'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { SafeAreaView } from 'react-native-safe-area-context';
function ContactComponent() {

    async function sendEmail(){
        let result = await MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
        alert(result.status);
    }

    return (
        <Animatable.View animation="fadeInDown" delay={1000}>
            <SafeAreaView>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider/>
                    <Text>Our Address</Text>
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>HONG KONG</Text>
                    <Text>Tel: +852 1234 5678</Text>
                    <Text>Fax: +852 8765 4321</Text>
                    <Text>Email:confusion@food.net</Text>
                    <Button 
                        title='Send An Email'
                        buttonStyle={{
                            backgroundColor:'#512DA8',
                            marginTop:15,
                                    }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress= {sendEmail}
                    />
                </Card>
            </SafeAreaView>
        </Animatable.View>
    )
}

export default ContactComponent
