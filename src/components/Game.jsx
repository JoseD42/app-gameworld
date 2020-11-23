import React, {Component, Fragment} from 'react';
import {getApolloContext, gql} from '@apollo/client';
import {Table, TableBody, TableRow, TableCell, Header, Container, Divider, Image, Menu, Button} from 'semantic-ui-react';

const GET_GAME_BY_ID = gql`
    query($id: ID!){
        game(id: $id){
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

export default class Game extends Component{

    state = {
        id: '',
        name: '',
        author: '',
        image: '',
        description: '',
        Genre: ''
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({
            query: GET_GAME_BY_ID,
            variables: {
                id: this.props.history.location.state.gameId
            }
        });
        const {id, name, author, image, description, Genre} = response.data.game;
        this.setState({id: id, name: name, author: author, image: image, description: description, Genre: Genre.name});
          
        console.log(response.data.game);

    }
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });
    enviaraGames = () => this.props.history.push({ pathname: '/games' });
    render() {
        const { activeItem } = this.state
        const {name, author, description, Genre} = this.state;
        return (
            <header style={{flex:'1', position:'absolute', minHeight:'100%', minWidth:'1024px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width:'100%', height:'auto', backgroundImage: `url(${"https://ak.picdn.net/shutterstock/videos/1035635633/thumb/12.jpg?ip=x480"})`}}>
            <Fragment>
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
    
            <Menu.Item
              name='Subir juego'
              active={activeItem === 'subir juego'}
              onClick={this.enviaraAddGame}><h5 style={{fontSize:'17px'}}>Subir Juego</h5></Menu.Item>
          </Menu>
            </div>
            
        </Fragment>
                  <br></br>
                  <Divider horizontal>
                    <Header style= {{color: 'white'}} as='h2'>
                        Información del juego:
                    </Header>
                </Divider>
                <Container>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell><Image centered src={this.state.image} style={{width:'400px'}} />
                            <TableRow>
                            <TableCell width={2}><h3>Nombre</h3></TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><h3>Autor</h3></TableCell>
                            <TableCell>{author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><h3>Género</h3></TableCell>
                            <TableCell>{Genre}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><h3>Descripción</h3></TableCell>
                            <TableCell>{description}</TableCell>
                        </TableRow>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div style={{padding:'0px 946px'}}>
                 <Button size='massive' color='teal'>Descargar</Button>   
                </div>
                
                </Container>
            </Fragment>
            <Container>
            <p style={{margin:'200px 0px'}}>

              {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          </Container> 
            <footer style={{textAlign:'center', color:'white'}}>Derechos reservados 2020</footer>
        </header>
        );
        
    }
    
}