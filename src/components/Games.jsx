import React, {Component, Fragment} from 'react';
import {Button, Container, List, ListContent, Grid, Menu} from 'semantic-ui-react';
import {getApolloContext, gql} from '@apollo/client';

const GET_ALL_GAMES = gql`
    {
        games{
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

export default class Games extends Component{

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });

    enviaraGenres = () => this.props.history.push({ pathname: '/genres' });

    enviaraHome = () => this.props.history.push({ pathname: '/' });

    state = {
        games: [],
        gamesOptions: [],
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
                        <div style={{backgroundColor: 'lightyellow'}} class="card">
                        <div class= "content">
                            <div class="header">
                                {game.name}
                            </div>
                        </div>
                            <div className="image">
                                <img style={{height:'180px'}} src={game.image}/>
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
            <div style={{ backgroundColor: 'lightgrey'}}>
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
              name='Explorar Géneros'
              active={activeItem === 'Explorar Géneros'}
              onClick={this.enviaraGenres}><h5 style={{fontSize:'17px'}}>Explorar por Género</h5></Menu.Item>
    
            <Menu.Item
              name='Subir juego'
              active={activeItem === 'subir juego'}
              onClick={this.enviaraAddGame}><h5 style={{fontSize:'17px'}}>Subir Juego</h5></Menu.Item>
          </Menu>
            </div>
        </Fragment>
                        <br></br>    
                <Container>
                    <div class="ui grid"> 
                        {this.showGames()}
                    </div>
                </Container>
            </Fragment>
            </div>
        );
    }
}

/*<div  className="ui link cards">
<div style={{ backgroundColor: 'lightyellow'}} className="card">
<div className="image">
<img src={game.image}/>
</div>
<div className="content"> 
<div style={{textAlign: 'center'}}><h2>{game.name}</h2></div>
<br></br>
    <div><h4>Género: {game.Genre.name}</h4></div>
    <br></br>
<div style={{textAlign: 'justify'}}>
    {game.description}
</div>
</div>
</div>
</div>*/