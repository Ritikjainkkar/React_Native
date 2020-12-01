import React, {Component} from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    };
}

class Menu extends Component {

    constructor(props) {
        super(props)
    }
    render() {


        const styles = StyleSheet.create({
            tinyLogo: {
              width: 50,
              height: 50,
            },
        });
        
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return (
                <ListItem bottomDivider onPress={() => navigate('DishDetail',{dishId: item.id})}>
                    <Image style={styles.tinyLogo} source={{uri:baseUrl+item.image}}/>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        if(this.props.dishes.isLoading){
            return (
                <Loading />
            );
        }else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }else{
            return (
                <FlatList
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            )
        }
    }
}

export default connect(mapStateToProps)(Menu);