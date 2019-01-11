import React, {
    PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import { Spin } from 'antd';

class Loading extends PureComponent {
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
            <Spin />
        </div>
    }
}

export default Loading;
