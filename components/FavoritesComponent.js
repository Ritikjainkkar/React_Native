import React from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, Image, StyleSheet, Text, View, Alert, TouchableOpacity, Animated} from 'react-native';
import { ListItem } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
    };
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteFavorite}, dispatch)
  }

const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
    swiper:{
        borderColor:'black',
        backgroundColor:'red'
    },
    swiperText:{

        backgroundColor:'#512DA8',
        color:"white",
        fontSize:25,
        flex: 1,
        textAlignVertical: 'center',
    }
});


const FavoritesComponent = (props) =>{


    const renderFavoriteItem = ({item, index}) => {

        const {navigate} = props.navigation;

        const rightButton = (progress, dragX) => {
            const scale = dragX.interpolate({
                inputRange: [-50, 0],
                outputRange: [1, 0]
            })
            return(
                <>
                    <TouchableOpacity onPress={() => rightSwipeAction()}>
                        <View style={{flex:1, backgroundColor: 'red', justifyContent: 'center'}}>
                            <Animated.Text style={{color: 'white', paddingHorizontal: 10,
                                    fontWeight:'600', transform: [{scale}]}}>
                                        Delete
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
    
        const rightSwipeAction = () => {
            console.log('jaihoo')
            Alert.alert(
                'Delete Favorite?',
                'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                [
                    { 
                        text: 'Cancel', 
                        onPress: () => console.log(item.name + 'Not Deleted'),
                        style: ' cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => props.deleteFavorite(item.id)
                    }
                ],
                { cancelable: false }
            )
        }
    
        return(
            <Swipeable renderRightActions={rightButton}>
                <ListItem bottomDivider key={index} onPress={() => navigate('DishDetail',{dishId: item.id})}>
                    <Image style={styles.tinyLogo} source={{uri:baseUrl+item.image}}/>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Swipeable>
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
            deleteFavorite={props.deleteFavorite}
            keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoritesComponent);