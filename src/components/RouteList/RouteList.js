import React from 'react';
import { withFirebase } from '../Firebase/context';
import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import { List, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core';
import NewRoute from '../NewRoute/NewRoute';

class RouteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            routes: [],
        };
    }
    componentDidMount() {
        this.updateRoutes();
    }

    componentWillUnmount() {
        this.props.firebase.routes().off();
    }

    updateRoutes() {
        this.setState({ loading: true });
        this.props.firebase.routes().on('value', snapshot => {
            const routesObject = snapshot.val();
            const routesList = Object.keys(routesObject).map(key => ({
            ...routesObject[key],
            id: key
            }));
            this.setState({
                routes: routesList,
                loading: false,
            });
        });
    }

    createRoute = (name) => {
        let uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        let route = {
            id: uniqueId,
            name: name
        }
        this.props.firebase.addRoute(route).then(result => {
            console.log(result);
        });
    }
    render() {
        const { routes, loading } = this.state;
        return (
        <div>
            <h3>Routes</h3>
            <NewRoute addRoute={this.createRoute} />
            {loading ||      
                <List component="nav" aria-label="contacts">
                    {
                        routes.map(route => (
                        <ListItem button key={route.id}>
                            <ListItemIcon>
                            <MapIcon />
                            </ListItemIcon>
                            <ListItemText primary={route.name} />
                        </ListItem>
                    ))}
                </List>
            }
        </div>
        );
    }
}
export default withFirebase(RouteList);