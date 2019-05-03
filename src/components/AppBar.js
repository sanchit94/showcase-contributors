import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/login';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        marginRight : "auto",
    },
    centerText: {
        flexGrow : "1",
        lineHeight : "1em",
        textAlign: "left",
        margin: "auto"
    },
    button: {
        float: "right",
        marginLeft : "auto"
    }
    
}

class AppBar extends React.Component {

    logOut = () => {
        this.props.logout();
        localStorage.setItem('user', '');
        // props.history.push('/logout');
        console.log(this.props.history);
    }
    render() {
        return(
            <div className="app-header">
                <Image src={logo} style={style.image} />
                <h2 className="visible-md" style={style.centerText}>Infino Contributors</h2>
                {this.props.isLoggedIn && <Button style={style.button} onClick={this.logOut}><Link to="/logout">Logout</Link></Button>}
                {!this.props.isLoggedIn && <Button style={style.button}><Link to="/login">Login</Link></Button>}
                <Button style={style.button}><Link to="/">Roadmap</Link></Button>
            </div>
        );

    }
    
}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, { logout })(AppBar);