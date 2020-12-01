import React, { Component,useState } from 'react'
import { View, Text, StyleSheet, ScrollView,  Modal, TouchableHighlight, TextInput } from 'react-native'
import { Card, Icon, Input } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';

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
    const [showModal,setModal] = useState(false);
    const [rating,setRating] = useState(1);
    const [comment,setComment] = useState('');
    const [author,setAuthor] = useState('');


    const toggleModal = () => {
        setModal(!showModal);
    } 

    const ratingCompleted = (rating) => {
        setRating(rating);
    }


    const submitComment = () => {
        props.postComment(props.dishId,rating,author,comment)
        setModal(!showModal);
    }

    if(dish != null){
        return (
            <ScrollView>
                <Card >
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Image source={{uri:baseUrl+dish.image}}></Card.Image>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
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
                </Card>
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
        <Card title='Comments'>
            <FlatList 
                data={comment}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Card>
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
      }
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
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+this.state.dishId]} 
                onPress={() => this.makeFavouriteDish(this.state.dishId)}
                postComment={this.props.postComment}
                dishId = {this.state.dishId}
                remove = {() => this.remove()}
                favorite ={this.props.favorites.some(el => el === this.state.dishId)}/>
                <RenderComments comments = {this.props.comments.comments.filter((item) => item.dishId === this.state.dishId)}/>
            </ScrollView>
        )
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
