import React from 'react';
import { withFirebase } from '../Firebase/context';
import Button from '@material-ui/core/Button';


class RouteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            routes: [],
        };
    }
    componentDidMount() {
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

    componentWillUnmount() {
        this.props.firebase.routes().off();
    }

    createRoute = () => {
        let uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        let route = {
            id: uniqueId,
            name: 'test route'
        }
        this.props.firebase.addRoute(route).then(result => {
            console.log(result);
        });
    }
    render() {
        const { routes, loading } = this.state;
        return (
        <div>
            <Button onClick={this.createRoute} >
               + Route
            </Button>
            <h1>Routes</h1>
            {loading ||      
                <ul>
                    {
                        routes.map(route => (
                        <li key={route.id}>
                        <span>
                            <strong>ID:</strong> {route.id}
                        </span>
                        <span>
                            <strong>Name:</strong> {route.name}
                        </span>
                        </li>
                    ))}
                </ul>}
        </div>
        );
    }
}
export default withFirebase(RouteList);