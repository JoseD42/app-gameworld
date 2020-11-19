import React, {Component, Fragment} from 'react';
import {Divider, Table, TableBody, TableRow, TableCell, Button, Card, Container} from 'semantic-ui-react';
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
        return this.state.games.map(p =>{
            //return <div key={p.id}>{p.name}</div>;
            return <Fragment>
                <Divider hidden/>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell width={2}>Nombre</TableCell>
                            <TableCell>{p.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Genre</TableCell>
                            <TableCell>{p.Genre.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell>{p.description}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Divider/>                   
            </Fragment>
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
                        {this.showGames()}
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