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
    state = {}
  
handleItemClick = (e, { name }) => this.setState({ activeItem: name })

enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });

    enviaraHome = () => this.props.history.push({ pathname: '/' });

    state = {
        games: [],
        isLoading: true
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({query: GET_ALL_GAMES});
        this.setState({games: response.data.games, isLoading: response.loading});
        console.log(response.loading);
    }

    inspectGame = id => this.props.history.push({pathname: '/game', state: {gameId: id}});

    showGames = ()=>{
        return this.state.games.map(game =>{
            //return <div key={p.id}>{p.name}</div>;
            return <List horizontal>
                <List.Item >
                    <ListContent onClick={() => this.inspectGame(game.id)}>
                        <div class="ui link cards">
                        <div style={{backgroundColor: 'lightyellow'}} class="card">
                        <div class= "content">
                            <div class="header">
                                {game.name}
                            </div>
                        </div>
                            <div className="image">
                                <img src={game.image}/>
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
                     <h1 style={{textAlign:'center', color: 'white', fontSize:'50px'}}>GameWorld</h1>   
                    </a>
                        </div>
                    
          <Menu widths= "9">
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
        <div class="ui grid">
            
        </div>
                        <br></br>
                        <br></br>
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