import React, {
    PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.css';

class Main extends PureComponent {
    static propTypes = {

    };
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return <div className={style.box}>
        	this is main
        </div>
    }
}

export default Main;
