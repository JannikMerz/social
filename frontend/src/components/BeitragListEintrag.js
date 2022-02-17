import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
/* 
import SocialPetApi from '../api/SocialPetApi'; */


class BeitragListeEintrag extends Component {

    constructor(props) {
        super(props);

        //initiiere einen leeren state
        this.state = {
            error: null,
            loadingInProgress: false,
        };
    }



    componentDidMount() {
    }

    render() {
        const { beitrag } = this.props;
        const { } = this.state;

        return (
            <div style={{ marginTop: '50px' }}>
                {
                    beitrag ?
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                title={beitrag.titel}
                                subheader={beitrag.datum}
                            />
                            {/* <CardMedia
                                component="img"
                                height=""
                                image=""
                                alt="Kein Foto"
                            /> */}
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                   {beitrag.inhalt}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                            </CardActions>

                        </Card>
                        :
                        <></>
                }

            </div>
        );
    }
}

export default BeitragListeEintrag;