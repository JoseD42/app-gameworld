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
        <header style={{ backgroundImage:`url(${"https://cdn-3.expansion.mx/dims4/default/a8d9bb5/2147483647/strip/true/crop/724x483+0+0/resize/1800x1201!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F94%2F91%2Ffd67f78e4362965da5403223727c%2Fvideojuegos-emprendedores-gamers.jpg"})`}}>
         <Fragment>
            <div style={{backgroundColor: '#C50505'}}>
                  <h1 style={{textAlign:'center', color: 'white'}}>GameWorld</h1>
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
            <Container>
            <p  style={{backgroundColor: '#C2C5EC', margin:'200px 200px', padding:'15px 15px', border: '1px solid black'}}>
              Esta es una plataforma para cualquier 
              persona que busque dar a conocer sus 
              videojuego.
              ¡Anímate y sube el tuyo también! {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          </Container>        
        </Fragment> 
        <footer> Arrrrrrrrrrrrrrrrrrrrrrrre</footer>
        </header>
        
      )
    } 
}
