import React, {
    PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import moment from 'moment';
moment.updateLocale('zh-cn', {
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});
import 'styles/common/index.css';
import 'antd/dist/antd.less';

import {Route, Switch, Redirect, Link} from 'react-router-dom';
import Loadable from 'react-loadable';

function Loading(){
    return '...loading';
}

const Profile = Loadable({
    loader: () => import('boxes/Profile'),
    loading: Loading,
});

import Main from 'boxes/Main';
// import Profile from 'boxes/Profile';

class Wrapper extends PureComponent {
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
        return <div>
            <Link to='/main'>主页</Link> |
            <Link to='/profile'>个人主页</Link>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/main' component={Main}/>
                <Route path='/profile' component={Profile}/>
            </Switch>
        </div>
    }
}

export default Wrapper;
