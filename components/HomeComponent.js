import React, { Component } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    };
}


function RenderItem(props) {
    const item = props.item;
    console.log(props.isLoading);
    if(props.isLoaded){
        return(
            <Loading />
        )
    }
    else if(props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    else{
        if(item != null){
            return(
                <Card>
                    <Card.Title>{item.name }</Card.Title>
                    <Card.Image source={{uri:baseUrl+item.image}}></Card.Image>
                    <Text style={{margin:10}}>{item.description}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class Home extends Component {

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                            isLoading = {this.props.dishes.isLoading}
                            errMess = {this.props.dishes.errMess} />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
                            isLoading = {this.props.dishes.isLoading}
                            errMess = {this.props.dishes.errMess}/>
                <RenderItem item={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]} 
                            isLoading = {this.props.dishes.isLoading}
                            errMess = {this.props.dishes.errMess}/>
                
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);