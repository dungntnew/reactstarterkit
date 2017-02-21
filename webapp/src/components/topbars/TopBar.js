import React, {PropTypes} from 'react';

import Logo from '../../components/PageLogo';
import PageHeader from '../../components/PageHeader';
import TopNav from '../../containers/TopNav';
import QuickSearchBar from '../../containers/QuickSearchBar';
import ToogleButton from '../../components/sidebars/ToggleButton';
import BreakPoint from '../../components/screen-utils/BreakPoint';

const TopBar = (props) => (
    <div>
    <BreakPoint name='desktop'>
        <PageHeader>
            <Logo color={true} />
            <QuickSearchBar location={props.location} params={props.params} />
            <TopNav />
        </PageHeader>
    </BreakPoint>
    <BreakPoint name='phone'>
       <div>
        <ToogleButton toogle={()=> {}}/>
        <QuickSearchBar location={props.location} params={props.params} />
       </div>
    </BreakPoint>
    </div>
)

TopBar.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default TopBar;
