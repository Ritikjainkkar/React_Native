import React from 'react';
import { FlatList, Image, StyleSheet, Text} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
    };
}

const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
});


const FavoritesComponent = (props) =>{
    const { navigate } = props.navigation;

    const renderFavoriteItem = ({item, index}) => {

        return(
            <ListItem bottomDivider key={index} onPress={() => navigate('DishDetail',{dishId: item.id})}>
                <Image style={styles.tinyLogo} source={{uri:baseUrl+item.image}}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }

    if(props.dishes.isLoading){
        return(<Loading />);
    }
    else if(props.dishes.errMsg){
        return(
            <View>            
                <Text>{this.props.dishes.errMess}</Text>
            </View>            
        );
    }
    else{
        return(
            <FlatList 
            data={props.dishes.dishes.filter(item => props.favorites.some(el => el === item.id))}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps)(FavoritesComponent);