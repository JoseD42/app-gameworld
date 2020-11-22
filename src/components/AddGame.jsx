import React, {Component, Fragment} from "react";
import {getApolloContext, gql} from '@apollo/client';
import {Form, Button, FormGroup, FormInput, FormSelect, Menu, Container} from 'semantic-ui-react';

const ADD_GAME = gql`
    mutation($name: String!, $author: String!, $image: String!, $description: String!, $genreId: ID!){
        addGame(name: $name, author: $author, image: $image, description: $description, genreId: $genreId){
            id
            name
            author
            image
            description
            Genre{
                name
            }
        }
    }
`;

const GET_ALL_GENREs = gql`
    {
        genres{
            id
            name
        }
    }
`;


export default class AddGame extends Component{
    state = {
        genreList: [],
        fieldName: '',
        fieldAuthor: '',
        fieldImage: '',
        fieldDescription: '',
        fieldGenre: '',
    }

    static contextType = getApolloContext(); 

    handleName = e => this.setState({fieldName: e.target.value});
    handleAuthor = e => this.setState({fieldAuthor: e.target.value});
    handleImage = e => this.setState({fieldImage: e.target.value});
    handleDescription = e => this.setState({fieldDescription: e.target.value});
    handleGenre = (e, {value}) => this.setState({fieldGenre: value});

    componentDidMount = async ()=>{
        const {client} = this.context;

        const response = await client.query({query: GET_ALL_GENREs});

        this.setState({genreList:  response.data.genres.map(item => {
            return {key: item.id, text: item.name, value: item.id };
        })});
    }

    saveGame = ()=>{
        const {fieldName, fieldAuthor, fieldImage, fieldDescription, fieldGenre} = this.state;
        const {client} = this.context;
        
        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldAuthor,
                image: fieldImage,
                description: fieldDescription,
                genreId: fieldGenre
            }
        }).then(res => console.log(res))
        .catch(error => console.log(error));
        this.props.history.push('/games');
        window.location.reload();
        console.log({name: fieldName, author: fieldAuthor, image: fieldImage, description: fieldDescription, genreId: fieldGenre});
    }
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });
    enviaraGames = () => this.props.history.push({ pathname: '/games' });
    render() {
        const { activeItem } = this.state
        return (
            <header style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${"https://ak.picdn.net/shutterstock/videos/1035635633/thumb/12.jpg?ip=x480"})`}}>
                <Fragment>
                    <div>
                    <Fragment>
                    <div style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:`url(${"https://image.freepik.com/vector-gratis/fondo-minimalista-abstracto-moderno-rojo-azul_155717-44.jpg"})`}}>

                    <div >
                    <a onClick={this.enviaraHome} style={{textAlign:'center', color: 'white', fontSize:'50px', }}>
                     <h1 style={{textAlign:'center', color: 'white', fontSize:'50px'}}><a href='Home.jsx' style={{color:'white'}}>GameWorld</a></h1>   
                    </a>
                        </div>
                    
          <Menu widths= "9">
            <Menu.Item
              name='Juegos'
              active={activeItem === 'juegos'}
              onClick={this.enviaraGames}><h5 style={{fontSize:'17px'}}>Juegos</h5></Menu.Item>
    
            <Menu.Item
              name='Descargar'
              active={activeItem === 'descargar'}
              onClick={this.handleItemClick}><h5 style={{fontSize:'17px'}}>Descargar</h5></Menu.Item>
          </Menu>
            </div>
            
        </Fragment>
        <br></br>
        <br></br>
        <br></br>
        
        <Container style={{fontSize:'20px', border:'2px solid black', padding:'20px 20px', backgroundColor:'#6EC3FF'}}>
                        <Form>
                    <FormGroup widths='equal' style={{fontSize:'20px', display:'inline'}}>
                        <FormInput style={{padding:'10px 10px'}} label='Nombre juego' placeholder='Nombre juego' onChange={this.handleName}/>
                        <FormInput style={{padding:'10px 10px'}} label='Nombre autor' placeholder='Nombre autor' onChange={this.handleAuthor}/>
                        <FormInput style={{padding:'10px 10px'}} label='Link imagen' placeholder='Link imagen' onChange={this.handleImage}/>
                        <FormInput style={{padding:'10px 10px'}} label='Descripción juego' placeholder='Descripción juego' onChange={this.handleDescription}/>
                        <FormSelect options={this.state.genreList} label='Género' placeholder='Género' onChange={this.handleGenre}/>
                    </FormGroup>
                    <div><Button content='Subir' onClick={this.saveGame} style={{padding:'12px 18px', fontSize:'18px'}}/></div>
                    
                </Form>
        </Container>
                    </div>
                    
                </Fragment>
                <div>
            <Container>
            <p style={{margin:'180px 0px'}}>

              {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          </Container>    
            </div>
            

          <footer style={{textAlign:'center', color:'white'}}>Derechos reservados 2020</footer>
            </header>
            
        );
    }
}