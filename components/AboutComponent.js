import React, {Component} from 'react';
import { View, FlatList, Image, StyleSheet, Text,ScrollView } from 'react-native';
import { Card,ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
    };
}

function AboutComponent(props) {

    const styles = StyleSheet.create({
        tinyLogo: {
          width: 50,
          height: 50,
        },
    });

    const renderList = ({item, index}) => {
        return(
            <ListItem bottomDivider>
                <Image style={styles.tinyLogo} source={{uri:baseUrl+item.image}}/>
                <ListItem.Content>
                    <ListItem.Title >{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    const OurHistory= () => {
        return(
            <Card>
                <Card.Title>Our History</Card.Title>
                <Card.Divider/>
                <Text>Started in 2010, Ristorante con Fusion quickly established
                     itself as a culinary icon par excellence in Hong Kong. With
                    its unique brand of world fusion cuisine that can be found
                   nowhere else, it enjoys patronage from the A-list clientele
                    in Hong Kong.  Featuring four of the best three-star Miche
                    lin chefs in the world, you never know what will arrive on
                    your plate the next time you visit us.
    
                    The restaurant traces its humble beginnings to The Frying P
                    an, a successful chain started by our CEO, Mr. Peter Pan, t
                    hat featured for the first time the world's best cuisines i
                    n a pan.</Text>
            </Card>
        );
    }

    if (props.leaders.isLoading){
        return(
            <ScrollView>
                <OurHistory />
                <Card
                    title='Corporate Leadership'>
                    <Loading />
                </Card>
            </ScrollView>
        )
    }
    else if(props.leaders.errMess){
        return(
            <ScrollView>
                <OurHistory />
                <Card
                    title='Corporate Leadership'>
                    <Text>{props.leaders.errMess}</Text>
                </Card>
            </ScrollView>
        )
    }
    else{
        return (
            <ScrollView>
                <OurHistory />
                <Card>        
                    <FlatList 
                        data={props.leaders.leaders}
                        renderItem={renderList}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
    )}
}

export default connect(mapStateToProps)(AboutComponent);
