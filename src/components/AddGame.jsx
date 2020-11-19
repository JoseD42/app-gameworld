import React, { Component, Fragment } from 'react'
import {getApolloContext, gql} from '@apollo/client';
import {Form, Button, FormGroup, FormInput, FormSelect, Container} from 'semantic-ui-react';

const ADD_GAME = gql`
    mutation($name: String!, $author: String!, $image: String!, $description: String!){
        addProduct(name: $name, author: $author, image: $image, description: $description){
            id
            name
            author
            image
            description
        }
    }
`;


export default class AddGame extends Component{

    enviaraHome = () => this.props.history.push({ pathname: '/' });

    state = {
        fieldName: '',
        fieldAuthor: '',
        fieldImage: '',
        fieldDescription: '',
    }

    static contextType = getApolloContext(); 

    handleName = e => this.setState({fieldName: e.target.value});
    handleAuthor = e => this.setState({fieldAuthor: e.target.value});
    handleImage= e => this.setState({fieldImage: e.target.value});
    handleDescription = e => this.setState({fieldDescription: e.target.value});

    /*componentDidMount = async ()=>{
        const {client} = this.context;

        const response = await client.query({query: GET_ALL_GENREs});

        this.setState({genreList:  response.data.genres.map(item => {
            return {key: item.id, text: item.name, value: item.id };
        })});
    }*/

    saveGame = ()=>{
        const {fieldName, fieldAuthor, fieldImage, fieldDescription} = this.state;
        const {client} = this.context;
        
        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldAuthor,
                image: fieldImage,
                description: fieldDescription,
            }
        }).then(res => console.log(res))
        .catch(error => console.log(error));
        this.props.history.push('/home');
        window.location.reload();
        console.log({name: fieldName, author: fieldAuthor, image: fieldImage, description: fieldDescription});
    }

    render() {
        return (
            <Fragment>
                <Button 
                style={{backgroundColor: '#C50505'}}
                onClick={this.enviaraHome}>
                        <h1 style={{margin:'0px 840px', textAlign:'center', color: 'white'}}>GameWorld</h1>
                </Button>
                        <br></br>
                        <br></br>
                        <br></br>
                <Container>
                    <Form>
                        <FormGroup widths='equal'>
                            <FormInput label='Nombre juego' placeholder='Nombre juego' onChange={this.handleName}/>
                            <FormInput label='Autor' placeholder='Autor' onChange={this.handleAuthor}/>
                            <FormInput label='Link de Imagen' placeholder='Link de Imagen' onChange={this.handleImage}/>
                            <FormInput label='Descripción del juego' placeholder='Descripción del juego' onChange={this.handleDescription}/>
                        </FormGroup>
                        <Button content='Subir' onClick={this.saveGame}/>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}
