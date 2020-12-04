import React, {Component, Fragment, createRef} from "react";
import {getApolloContext, gql} from '@apollo/client';
import {Form, Button, FormGroup, FormInput, FormSelect, Menu, Container} from 'semantic-ui-react';
import axios from 'axios';


const ADD_GAME = gql`
    mutation($name: String!, $author: String!, $image: String!, $description: String!, $fileP: String!, $genreId: ID!){
        addGame(name: $name, author: $author, image: $image, description: $description, fileP: $fileP, genreId: $genreId){
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

const GET_ALL_GENREs = gql`
    {
        genres{
            id
            name
        }
    }
`;


export default class AddGame extends Component{
    state = {
        genreList: [],
        fieldName: '',
        fieldAuthor: '',
        fieldImage: '',
        fieldDescription: '',
        file: '',
        getFile: { file: '', path: '' },
        progress: '',
        fileI: '',
        getFileI: { file: '', path: '' },
        progressI: '',
        fieldPFile: '',
        fieldNFile: '',
        fieldGenre: '',
    }

    constructor() {
        super();
        this.el = React.createRef();
        this.el2 = React.createRef();
    }

    static contextType = getApolloContext(); 

    handleName = e => this.setState({fieldName: e.target.value});
    handleAuthor = e => this.setState({fieldAuthor: e.target.value});
    handleDescription = e => this.setState({fieldDescription: e.target.value});
    handleGenre = (e, {value}) => this.setState({fieldGenre: value});

    componentDidMount = async ()=>{
        const {client} = this.context;

        const response = await client.query({query: GET_ALL_GENREs});

        this.setState({genreList:  response.data.genres.map(item => {
            return {key: item.id, text: item.name, value: item.id };
        })});
    }

    saveGame = ()=>{
        const {fieldName, fieldAuthor, fieldImage, fieldDescription, fieldGenre, fieldPFile} = this.state;
        const {client} = this.context;
        
        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldAuthor,
                image: fieldImage,
                description: fieldDescription,
                fileP: fieldPFile,
                genreId: fieldGenre
            }
        }).then(res => console.log(res))
        .catch(error => console.log(error));
        this.props.history.push('/games');
        window.location.reload();
        console.log({name: fieldName, author: fieldAuthor, image: fieldImage, description: fieldDescription, genreId: fieldGenre, fileP: fieldPFile});
    }
    state = {}

    enviaraGames = () => this.props.history.push({ pathname: '/games' });

    enviaraGenres = () => this.props.history.push({ pathname: '/genres' });

    render() {
        const { activeItem } = this.state

        const { file, progress, fileI, progressI } = this.state;
        const setFile = file => this.setState({ file });
        const setProgess = progress => this.setState({ progress });

        const setFileI = fileI => this.setState({ fileI });
        const setProgessI = progressI => this.setState({ progressI })

        const handleChange = (e) => {
            setProgess(0)
            const file = e.target.files[0]
            console.log(file);
            setFile(file)
        }

        const handleChangeImage = (e) => {
            setProgessI(0)
            const fileI = e.target.files[0]
            console.log(fileI);
            setFileI(fileI)
        }

        const uploadFile = () => {
            const formData = new FormData();
            formData.append('file', file)
            axios.post('http://localhost:5000/upload', formData, {
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgess(progress)
                }
            }).then(res => {
                console.log(res);
                this.setState({ getFile: { name: res.data.file, path: 'http://localhost:5000' + res.data.path } })
                this.setState({ fieldNFile: res.data.file });
                this.setState({ fieldPFile: res.data.path });
            }).catch(err => console.log(err))
        }

        const uploadImage = () => {
            const formDataI = new FormData();
            formDataI.append('file', fileI)
            axios.post('http://localhost:5000/upload', formDataI, {
                onUploadProgress: (ProgressEvent) => {
                    let progressI = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgessI(progressI)
                }
            }).then(res => {
                console.log(res);
                this.setState({ getFileI: { name: res.data.file, path: 'http://localhost:5000' + res.data.path } })
                this.setState({ fieldImage: res.data.path });
            }).catch(err => console.log(err))
        }

        return (
            <header style={{flex:'1', position:'absolute', minHeight:'100%', minWidth:'1024px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width:'100%', height:'auto', backgroundImage: `url(${"https://ak.picdn.net/shutterstock/videos/1035635633/thumb/12.jpg?ip=x480"})`}}>
                <Fragment>
                    <div>
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
              name='Juegos'
              active={activeItem === 'juegos'}
              onClick={this.enviaraGames}><h5 style={{fontSize:'17px'}}>Juegos</h5></Menu.Item>
    
            <Menu.Item
              name='Explorar Géneros'
              active={activeItem === 'Explorar Géneros'}
              onClick={this.enviaraGenres}><h5 style={{fontSize:'17px'}}>Explorar por Género</h5></Menu.Item>
          </Menu>
            </div>
            
        </Fragment>
        <br></br>
        <br></br>
        <br></br>
        {/* Formulario para añadir juegos */}
        <Container style={{fontSize:'20px', border:'2px solid black', padding:'20px 20px', backgroundColor: 'rgba(255, 255, 255, 0.548)'}}>
                        <Form>
                    <FormGroup widths='equal' style={{fontSize:'20px', display:'inline'}}>
                    <div class="two fields">
                        <FormInput style={{padding:'10px 10px'}} label='Nombre juego' placeholder='Nombre juego' onChange={this.handleName}/>
                        <FormInput style={{padding:'10px 10px'}} label='Nombre autor' placeholder='Nombre autor' onChange={this.handleAuthor}/>
                    </div>
                    <div class="two fields">
                        <div style={{padding:'10px 19px'}}>
                            <input type="file" ref={this.el} onChange={handleChange} />
                            <br />
                            <div style={{ width: progress }}>{progress}</div>
                            <br />
                            <Button size="medium" inverted onClick={uploadFile}>Subir Archivo</Button>
                        </div>
                        <div style={{padding:'10px 20px'}}>
                            <input type="file" ref={this.el2} onChange={handleChangeImage} />
                            <br />
                            <div style={{ width: progressI }}>{progressI}</div>
                            <br />
                            <Button size="medium" inverted onClick={uploadImage}>Subir Imagen</Button>
                        </div>

                    </div>
                    <br />
                        <Form.TextArea rows="2" style={{height:'50px', padding:'10px 10px'}} label='Descripción juego' placeholder='Descripción juego' onChange={this.handleDescription}/>
                        <br></br>
                        <div style={{padding:'0px 15px'}} class="two fields">
                            <FormSelect options={this.state.genreList} label='Género' placeholder='Género' onChange={this.handleGenre}/>
                        </div>
                    </FormGroup>
                    <div><Button color='teal' content='Subir Juego' onClick={this.saveGame} style={{padding:'24px 36px', fontSize:'18px'}}/></div>        
                </Form>
        </Container>
                    </div>
                    
                </Fragment>
                <div>   
            </div>
            <p style={{margin:'300px 0px'}}>

              {/* <div style={{paddingTop:'10px', paddingLeft:'270px', paddingRight:'270px'}}><Button><h4>Comenzar</h4></Button></div> */}
            </p>
          <footer style={{textAlign:'center', color:'white'}}>Derechos reservados 2020</footer>
            </header>
        );
    }
}