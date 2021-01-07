import React, { Component,useState,  useRef  } from 'react'
import { View, Text, StyleSheet, ScrollView,  Modal, TouchableHighlight, TextInput,PanResponder, Alert, Share } from 'react-native'
import { Card, Icon, Input } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    };
}

const mapDispatchToProps = dispatch => ({
        postFavorite: (dishId) => dispatch(postFavorite(dishId)),
        postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
})

function RenderDish(props){
    console.log(props);
    const dish = props.dish;
    const handleViewRef = useRef(null);

    const [showModal,setModal] = useState(false);
    const [rating,setRating] = useState(1);
    const [comment,setComment] = useState('');
    const [author,setAuthor] = useState('');

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeDragLeftToRight = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            handleViewRef.current.rubberBand(1000); 
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDragLeftToRight(gestureState)){
                toggleModal();
            }
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })


    const toggleModal = () => {
        setModal(!showModal);
    } 

    const ratingCompleted = (rating) => {
        setRating(rating);
    }

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    const submitComment = () => {
        props.postComment(props.dishId,rating,author,comment)
        setModal(!showModal);
    }

    if(dish != null){
        return (
            <SafeAreaView>
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}
                ref={handleViewRef}>
                    <Card>
                        <Card.Title>{dish.name}</Card.Title>
                        <Card.Image source={{uri:baseUrl+dish.image}}></Card.Image>
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                            <View style={styles.formRow}>
                                <Icon
                                    raised
                                    reverse
                                    name={ props.favorite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => props.favorite ? props.remove() : props.onPress()}
                                />
                                <Icon
                                    raised
                                    reverse
                                    name='pencil'
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => toggleModal()}
                                />
                                <Icon
                                    raised
                                    reverse
                                    name='share'
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => shareDish(dish.name,dish.description, baseUrl + dish.image)}
                                />
                            </View>
                    </Card>
                </Animatable.View>
                <View style={styles.modalView}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => toggleModal }
                    >
                        <View style={styles.modalView}>
                            <View>
                            <Rating
                                type='custom'
                                ratingColor='#FFFF00'
                                ratingBackgroundColor='#FFFFFF'
                                ratingCount={5}
                                onFinishRating={ratingCompleted}
                                style={{ paddingVertical: 10 }}
                                />
                            <Input
                                label='Comment'
                                placeholder="Comment"
                                style={styles.input}
                                onChangeText={value => setComment(value)}
                            />
                            <Input
                                label='Author'
                                placeholder="Author"
                                style={styles.input}
                                onChangeText={value => setAuthor(value)}
                            />
                
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    submitComment()
                                }}
                            >
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
    else {
        return (<View ></View>)
    }
}

function RenderComments(props){
    
    const comment = props.comments

    const renderCommentItem = ({item , index}) => {
        return (
            <View style={{margin:10}} key={index}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        )
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList 
                    data={comment}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card> 
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        alignItems:'stretch'
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
        alignItems: 'stretch',
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
      },
      formRow: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginLeft: 60
      },
})
class DishDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
             dishId: props.route.params.dishId,
             showComment: false,
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };


    makeFavouriteDish(dishId){
        this.props.postFavorite(dishId);
    }

    remove(){
        this.setState({favourites:[]})
    }

    render() {

        return (
            <SafeAreaView>
                <ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+this.state.dishId]} 
                        onPress={() => this.makeFavouriteDish(this.state.dishId)}
                        postComment={this.props.postComment}
                        dishId = {this.state.dishId}
                        remove = {() => this.remove()}
                        favorite ={this.props.favorites.some(el => el === this.state.dishId)}/>
                    <RenderComments comments = {this.props.comments.comments.filter((item) => item.dishId === this.state.dishId)}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
