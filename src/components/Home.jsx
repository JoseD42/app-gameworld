import React, { Component, Fragment } from 'react'
import {getApolloContext, gql} from '@apollo/client';
import {Button, Container, Grid, Header, Icon, Image, Input, Item, Label, Menu, Segment, Step, Table, Divider, Modal, Rating, Popup, Card, List} from 'semantic-ui-react'

const GET_ALL_GAMES = gql`
{ 
games
    {
        id
        name
        author
        image
        description
        Genre
        {
            name
        }
    }
}`;

export default class MenuExampleBasic extends Component {
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    enviaraAddGame = () => this.props.history.push({ pathname: '/addgame' });
    enviaraGames = () => this.props.history.push({ pathname: '/games' });
    enviaraGenres = () => this.props.history.push({ pathname: '/genres' });
  
    render() {
      const { activeItem } = this.state
      const Images = [
        'https://cdn-3.expansion.mx/dims4/default/a8d9bb5/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F94%2F91%2Ffd67f78e4362965da5403223727c%2Fvideojuegos-emprendedores-gamers.jpg'
      ];

      return(
        <header style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${"https://cdn-3.expansion.mx/dims4/default/a8d9bb5/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F94%2F91%2Ffd67f78e4362965da5403223727c%2Fvideojuegos-emprendedores-gamers.jpg"})`}}>
         <Fragment>
            <div style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage:`url(${"https://image.freepik.com/vector-gratis/fondo-minimalista-abstracto-moderno-rojo-azul_155717-44.jpg"})`}}>
              
              
                  <h1 style={{textAlign:'center', color: 'white', fontSize:'50px'}}><img src="https://www.informaticanosolopc.com/wp-content/uploads/MANDO-BLANCO-PNG-01.png" style={{width:'150px', height:'150px', float:'left', padding:'0px 80px'}}/>GameWorld</h1>
                  
          <Menu widths= "9">
            <Menu.Item
              name='Juegos'
              active={activeItem === 'juegos'}
              onClick={this.enviaraGames}><h5 style={{fontSize:'17px'}}>Juegos</h5></Menu.Item>
    
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
        <div>
        <div style={{margin:'300px 300px', border:'3px solid white', textAlign:'center'}}>
          <Container>
            <p style={{color:'white', font: 'bold', fontSize:'17px', margin:'15px 0px'}}>
              <h1 style={{margin:'10px'}}>¿QUIERES DAR A CONOCER TU PROPIO VIDEOJUEGO?</h1>
              GameWorld es una plataforma web que te brinda la posibildad de subir todos aquellos videojuegos creados por ti para darlos a conocer en esta plataforma.
              Es un espacio diseñado para que todos aquellos alumnos de la Universidad La Salle puedan tanto publicar sus videojuegos como descargar todos aquellos que ya se hayan subido.
              Con tan solo acceder al apartado de "Subir juegos" y registrar los datos de tu proyecto podras publicarlo sin necesidad de crear una cuenta.
              Si deseas descargar algun proyecto de la comunidad puedes ir al apartado de "Descargar" y allí encontraras todos los juegos publicados hasta el momento.
              En caso de que tengas alguna duda puedes contactarnos desde: ... ... ...
              Creditos:
              Jose Daniel Becerra Esquer, César Alejandro Escobedo Cota, Jorge Abrecht Perez Paniagua, Daney Arvayo Castro.
            </p>
          </Container>
        </div>
        <Container>
            <p>

              {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          </Container>
        </div>
        <footer style={{textAlign:'center', color:'white'}}>Derechos reservados 2020</footer>
        </header>
        
      )
    } 
}
