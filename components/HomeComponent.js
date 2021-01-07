import React, { Component } from 'react';
import { Text, ScrollView, View, Image, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
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
                <SafeAreaView>
                    <Card>
                        <Card.Title>{item.name }</Card.Title>
                        <Card.Image source={{uri:baseUrl+item.image}}></Card.Image>
                        <Text style={{margin:10}}>{item.description}</Text>
                    </Card>
                </SafeAreaView>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class Home extends Component {

    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(1);    
    }

    componentDidMount () {
        this.animate()
    }

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver:true
          },{
              useNativeDriver:true
            }
        ).start(() => this.animate())
    }

    render() {

        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200 ]
        })
        
        return(
            <View style={{flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'center',
                }}>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}], useNativeDriver:true,}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        erreMess={this.props.dishes.erreMess} 
                        />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: xpos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        erreMess={this.props.promotions.erreMess} 
                        />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: xpos3}]}}>
                    <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        erreMess={this.props.leaders.erreMess} 
                        />
                    </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);