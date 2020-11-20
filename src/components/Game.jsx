import React, {Component, Fragment} from 'react';
import {getApolloContext, gql} from '@apollo/client';
import {Table, TableBody, TableRow, TableCell, Header, Container, Icon, Divider} from 'semantic-ui-react';

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
        Genre: '',
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        //console.log(this.props.history.location.state.productId);
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

    render() {
        const {id, name, author, image, description, Genre} = this.state;
        return (
            <Fragment>
                <div style={{backgroundColor: '#C50505'}}>
                  <h1 style={{textAlign:'center', color: 'white', fontSize:'30px'}}>GameWorld</h1>
                  </div>
                  <br></br>
                  <Divider horizontal>
                    <Header as='h4'>
                        Información:
                    </Header>
                </Divider>
                <Container>
                <Table definition>
                    <TableBody>
                        <TableRow>
                            <TableCell width={2}>Nombre</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Autor</TableCell>
                            <TableCell>{author}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Grupo</TableCell>
                            <TableCell>{Genre}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell>{description}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Container>
            </Fragment>
        );
    }
}