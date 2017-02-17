import React, {PropTypes} from 'react';

import Logo from '../../components/PageLogo';
import LPHeader from '../../components/LPHeader';
import TopLPNav from '../../containers/TopLPNav';
import Exploder from '../../containers/Exploder';

import '../../css/topbars/LPTopBar.css';

const LandingTopBar = (props) => (
    <LPHeader>
        <div className="ui secondary menu stackable lp-header-nav">
            <Logo/>
            <div className="right menu">
            <TopLPNav />
            </div>
        </div>
        <div className="title-introduce">
        <h1 className="title-header">食べる作る集まる。きっと何かはじまる。</h1>
        <p className="title-des">グルメのためのフードイベントサービス</p>
        </div>
        <Exploder location={props.location} params={props.params}/>
    </LPHeader>
)


LandingTopBar.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default LandingTopBar;