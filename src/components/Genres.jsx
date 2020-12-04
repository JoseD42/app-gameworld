import React, {Component, Fragment} from "react";
import {Container, List, ListContent, Select, Menu} from 'semantic-ui-react';

import {getApolloContext, gql} from '@apollo/client';

const GET_ALL_GENRES2 = gql`
    {
        genres{
            id
            name
            games{
                id
                name
                author
                image
                description
            }
        }
    }
`;

export default class GenreList extends Component{

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });

    enviaraGames = () => this.props.history.push({ pathname: '/games' });

    enviaraHome = () => this.props.history.push({ pathname: '/' });

    static contextType = getApolloContext(); 

    state = {
        genres: [],
        genresOptions: [],
        games: [],
        defaultOption: ''
    }

    handleGenre = (e, {value}) => {
        const genre = this.state.genres.find(genre => genre.id === value);
        this.setState({games: genre.games});
        console.log(this.state.games);
    }

    inspectGame = id => this.props.history.push({pathname: '/game', state: {gameId: id}});


    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({query: GET_ALL_GENRES2});
        this.setState({genres: response.data.genres,
        genresOptions: response.data.genres.map(genre =>{
            return {key: genre.id, value: genre.id, text: genre.name}
        })});
        this.setState({defaultOption: this.state.genres[0].id})
    }

    showGenres = ()=> {
        const {games} = this.state;
            return games.map(p =>{
                return <List horizontal>
                <List.Item style={{padding:'60px 10px'}}>
                    <ListContent style={{height:'200px'}} onClick={() => this.inspectGame(p.id)}>
                        <div class="ui link cards">
                        <div style={{backgroundColor: 'lightred'}} class="card">
                        <div class= "content">
                            <div class="header">
                                {p.name}
                            </div>
                        </div>
                            <div className="image">
                                <img style={{height:'180px'}} src={`http://localhost:5000${p.image}`}/>
                            </div>
                            <div class= "content">
                                <div class="left floated">
                                    <i class="user outline icon"></i>
                                    Autor:
                                    <div>{p.author}</div> 
                                </div>
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
            <header style={{flex:'1', position:'absolute', minHeight:'100%', minWidth:'1024px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width:'100%', height:'auto', backgroundImage: `url(${"https://www.xtrafondos.com/wallpapers/luces-neon-en-tunel-4261.jpg"})`}}>
            <Fragment>
                    <Fragment>
                        {/* Titulo */}
                    <div style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:`url(${"https://image.freepik.com/vector-gratis/fondo-minimalista-abstracto-moderno-rojo-azul_155717-44.jpg"})`}}>
                    <div style={{textAlign:'center', padding:'0px 760px', float:'left'}}>
                        <a href='Home.jsx'><img src="https://www.informaticanosolopc.com/wp-content/uploads/MANDO-BLANCO-PNG-01.png" style={{margin:'0px 20px', width:'65px', height:'75px'}}/></a>
                    <a onClick={this.enviaraHome} style={{textAlign:'center', color: 'white', fontSize:'50px', }}>
                     <h1 style={{ float:'left', margin:'0px 0px', color: 'white', fontSize:'50px'}}><a href='Home.jsx' style={{color:'white'}}>GameWorld</a></h1>   
                    </a>
                    </div>
            {/* Barra de navegación */}
          <Menu widths= "9">
            <Menu.Item
              name='Juegos'
              active={activeItem === 'juegos'}
              onClick={this.enviaraGames}><h5 style={{fontSize:'17px'}}>Juegos</h5></Menu.Item>
    
            <Menu.Item
              name='Subir juego'
              active={activeItem === 'subir juego'}
              onClick={this.enviaraAddGame}><h5 style={{fontSize:'17px'}}>Subir Juego</h5></Menu.Item>
          </Menu>
            </div>
        </Fragment>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Container>
                            <Select style={{width:'300px'}} search placeholder='Géneros' options={this.state.genresOptions} onChange={this.handleGenre}/>
                        </Container>
                <Container>
                    <div class="ui grid"> 
                        {this.showGenres()}
                    </div>
                </Container>
            </Fragment>
            </header>
        );
    }
}