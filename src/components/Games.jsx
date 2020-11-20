import React, {Component, Fragment} from 'react';
import {Button, Container, List, ListContent, Grid} from 'semantic-ui-react';
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
                    <ListContent >
                        <div class="ui link cards">
                        <div style={{backgroundColor: 'lightyellow'}} class="card">
                        <div class= "content">
                                <div class="right floated meta">
                                    <div style={{textAlign: 'center'}}><h2>{game.name}</h2></div>
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
                            <div class="extra content">
                                <span>
                                <div style={{textAlign: 'justify'}}>
                                {game.description}
                                </div>
                                </span>
                    </div>
                        </div>
                </div>
                    </ListContent>
                </List.Item>
            </List>
        });
}
    render() {
        return (
            <div style={{ backgroundColor: 'lightgrey'}}>
                <Fragment>
                <Button 
                style={{backgroundColor: '#C50505'}}
                onClick={this.enviaraHome}>
                        <h1 style={{margin:'0px 840px', textAlign:'center', color: 'white'}}>GameWorld</h1>
                </Button>
                        <br></br>
                        <br></br>
                        <br></br>
                <div>
                    <Container>
                    <Grid columns={3}>
                        {this.showGames()}
                    </Grid>
                    </Container>
                </div>
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