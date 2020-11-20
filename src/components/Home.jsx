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
  
    render() {
      const { activeItem } = this.state
      const Images = [
        'https://cdn-3.expansion.mx/dims4/default/a8d9bb5/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F94%2F91%2Ffd67f78e4362965da5403223727c%2Fvideojuegos-emprendedores-gamers.jpg'
      ];

      return(
        <header style={{backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${"https://cdn-3.expansion.mx/dims4/default/a8d9bb5/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F94%2F91%2Ffd67f78e4362965da5403223727c%2Fvideojuegos-emprendedores-gamers.jpg"})`}}>
         <Fragment>
            <div style={{backgroundColor: '#C50505'}}>
                  <h1 style={{textAlign:'center', color: 'white', fontSize:'30px'}}>GameWorld</h1>
          <Menu widths= "9">
            <Menu.Item
              name='juegos'
              active={activeItem === 'juegos'}
              onClick={this.enviaraGames}><h5>Juegos</h5></Menu.Item>
    
            <Menu.Item
              name='descargar'
              active={activeItem === 'descargar'}
              onClick={this.handleItemClick}><h5>Descargar</h5></Menu.Item>
    
            <Menu.Item
              name='subir juego'
              active={activeItem === 'subir juego'}
              onClick={this.enviaraAddGame}><h5>Subir Juego</h5></Menu.Item>
          </Menu>
            </div>
        </Fragment>
        <div>
        <div style={{margin:'300px 300px', border:'3px solid white', textAlign:'center', backgroundColor:'black'}}>
          <Container>
            <p style={{color:'white', font: 'bold', fontSize:'17px'}}>
              <h1>¿QUIERES DAR A CONOCER TU PROPIO VIDEOJUEGO?</h1>
              GameWorld es una plataforma web que te brinda la posibildad de subir todos aquellos videojuegos creados por ti para darlos a conocer en esta plataforma.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere nobis vel unde deleniti repellendus earum neque iure ad consequatur incidunt perspiciatis aspernatur, ea quaerat mollitia! Unde dolore soluta aut minus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde voluptas obcaecati deleniti tenetur asperiores doloribus, officiis fuga. Obcaecati totam dolorem enim facere culpa quos vero, sit aut reprehenderit consectetur repellat.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nulla quos iste obcaecati ipsum aspernatur. Exercitationem, fugiat sunt. Blanditiis asperiores sit provident laudantium corrupti, totam numquam dolor non autem aliquid.
            </p>
          </Container>
        </div>
        <Container>
            <p  style={{margin:'400px 200px', padding:'15px 15px'}}>

              {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          </Container>
        </div>
        
        </header>
        
      )
    } 
}
