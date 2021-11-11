import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import useLocalStorage from 'react-use-localstorage';
import { busca, post, } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import "./ListaPostagem.css";

function ListaPostagem() {
    const [posts, setPosts] = useState<Postagem[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            history.push("/login")

        }
    }, [token])

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {

        getPost()

    }, [posts.length])

    return (
        <div>
            <Box width="100%" className="fundo-listap">
                {
                    posts.map(post => (
                        <Grid container direction='row' alignItems='center' justifyContent='center'>
                            <Box className='caixa2' >
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography gutterBottom>

                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {post.titulo}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {post.texto}
                                        </Typography>
                                        <img src="{post.imagemUrl}" alt="" width="80%"/>
                                        <Typography variant="body2" component="p">
                                            {post.tema?.descricao}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))
                }
            </Box>

        </div>
    )
}

export default ListaPostagem
