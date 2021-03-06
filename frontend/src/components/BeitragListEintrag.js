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
import OtherProfilModal from './dialogs/OtherProfilModal'

import SocialPetApi from '../api/SocialPetApi';


class BeitragListeEintrag extends Component {

    constructor(props) {
        super(props);

        //initiiere einen leeren state
        this.state = {
            account: null,
            accountName: '',
            open: false,
            like: false,
            error: null,
            loadingInProgress: false,
        };
    }

    like = () => {
        this.setState({
            like: !this.state.like
        })
    }

    getAccountById = (id) => {
         	SocialPetApi.getAPI().getAccountById(id)
         		.then(account =>
         			this.setState({
         				account: account,
                        accountName: account.name,
         				error: null,
         				loadingInProgress: false,
         			}))
         			.catch(e =>
         				this.setState({
         					currentAccount: null,
         					error: e,
         					loadingInProgress: false,
         				}));
         		this.setState({
         			error: null,
         			loadingInProgress: true
         		});
            }

    componentDidMount = () => {
        console.log(this.props.beitrag.accountId)
        this.getAccountById(this.props.beitrag.accountId)
    }

    openProfile = () => {
        this.setState({
            open: true
        });
    }

    render() {
        const { beitrag } = this.props;
        const { like, accountName, open } = this.state;

        return (
            <div style={{ marginTop: '50px', marginBottom: '50px', display: 'flex', justifyContent: 'center'}}>
                {
                    open ?
                        <OtherProfilModal user={ accountName }></OtherProfilModal>

                    :
                    <></>

                }
                {
                    beitrag ?
                        <Card style={{ width: '800px' }}>
                            <CardHeader
                                avatar={
                                    <Avatar onClick={ this.openProfile } sx={{ bgcolor: red[500] }} >
                                        {accountName.charAt(0)}
                                    </Avatar>
                                }
                                title={beitrag.titel}
                                subheader={beitrag.datum}
                            />
                            <CardMedia
                                component="img"
                                height=""
                                image={beitrag.img}
                                alt={null}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                   {beitrag.inhalt}
                                </Typography><br/>
                            </CardContent>
                            <CardActions disableSpacing style={{ display: "flex" }}>
                                <Typography variant="body2" color="text.secondary" style={{marginLeft: "10px"}}> von {accountName}</Typography>
                                <IconButton aria-label="add to favorites" onClick={this.like} style={{marginLeft: "auto", marginRight: '20px'}}
                                sx={like ? { color: red[500] }: 'default'}>
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