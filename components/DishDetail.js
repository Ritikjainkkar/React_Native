import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon,Avatar } from 'react-native-elements'
import { DISHES } from '../shared/dishes';

function RenderDish(props){
    const dish = props.dish;

    const styles = StyleSheet.create({
        tinyLogo: {
            flex: 1,
            width: 250,
            height: 50,
        },
      });
    if(dish != null){
        return (
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Avatar style={styles.tinyLogo} source={require('./images/uthappizza.png')}/>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
            </Card>
        )
    }
    else {
        return (<View ></View>)
    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
             dishes:DISHES,
             dishId: props.route.params.dishId
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };
    
    render() {

        return (
            <RenderDish dish={this.state.dishes[+this.state.dishId]} />
        )
    }
    
}

export default DishDetail;
