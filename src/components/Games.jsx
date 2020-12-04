import React, {Component, Fragment} from 'react';
import {Container, List, ListContent, Menu} from 'semantic-ui-react';
import {getApolloContext, gql} from '@apollo/client';

const GET_ALL_GAMES = gql`
    {
        games{
            id
            name
            author
            image
            description
            fileP
            Genre{
                name
            }
        }
    }
`;

export default class Games extends Component{

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });

    enviaraGenres = () => this.props.history.push({ pathname: '/genres' });

    enviaraHome = () => this.props.history.push({ pathname: '/' });

    state = {
        games: [],
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({query: GET_ALL_GAMES});
        this.setState({games: response.data.games});
    }

    inspectGame = id => this.props.history.push({pathname: '/game', state: {gameId: id}});

    showGames = ()=>{
        return this.state.games.map(game =>{
            return <List horizontal>
                <List.Item style={{padding:'60px 10px'}}>
                    <ListContent style={{height:'200px'}} onClick={() => this.inspectGame(game.id)}>
                        <div class="ui link cards">
                        <div style={{backgroundColor: 'lightred'}} class="card">
                        <div class= "content">
                            <div class="header">
                                {game.name}
                            </div>
                        </div>
                            <div className="image">
                                <img style={{height:'180px'}} src={`http://localhost:5000${game.image}`} />
                            </div>
                            <div class= "content">
                                <div class="right floated">
                                    <i class="user outline icon"></i>
                                    Autor:
                                    <div>{game.author}</div> 
                                </div>
                                <i class="gamepad icon"></i>
                                Género: 
                                <div>{game.Genre.name}</div>
                            </div>
                        </div>
                </div>
                    </ListContent>
                </List.Item>
            </List>
        });
}

    render() {
        
        const { activeItem } = this.state
        return (
            <header style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:`url(${"https://ak.picdn.net/shutterstock/videos/25360745/thumb/1.jpg"})`}}>
                <Fragment>
                <Fragment>
                    {/* Titulo */}
                    <div style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:`url(${"https://image.freepik.com/vector-gratis/fondo-minimalista-abstracto-moderno-rojo-azul_155717-44.jpg"})`}}>
                    <div style={{textAlign:'center', padding:'0px 570px', float:'left'}}>
                        <a href='Home.jsx'><img src="https://www.informaticanosolopc.com/wp-content/uploads/MANDO-BLANCO-PNG-01.png" style={{margin:'0px 20px', width:'65px', height:'75px'}}/></a>
                    <a onClick={this.enviaraHome} style={{textAlign:'center', color: 'white', fontSize:'50px', }}>
                     <h1 style={{ float:'left', margin:'0px 0px', color: 'white', fontSize:'50px'}}><a href='Home.jsx' style={{color:'white'}}>GameWorld</a></h1>   
                    </a>
                    </div>
            {/* Barra de navegación */}
          <Menu widths= "9">
            <Menu.Item
              name='Explorar Géneros'
              active={activeItem === 'Explorar Géneros'}
              onClick={this.enviaraGenres}><h5 style={{fontSize:'17px'}}>Explorar por Género</h5></Menu.Item>
    
            <Menu.Item
              name='Subir juego'
              active={activeItem === 'subir juego'}
              onClick={this.enviaraAddGame}><h5 style={{fontSize:'17px'}}>Subir Juego</h5></Menu.Item>
          </Menu>
            </div>
            {/* Carta de juego */}
        </Fragment>
                        <br></br>    
                <Container>
                    <div class="ui grid"> 
                        {this.showGames()}
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
