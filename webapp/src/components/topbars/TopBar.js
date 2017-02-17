import React, {PropTypes} from 'react';

import Logo from '../../components/PageLogo';
import PageHeader from '../../components/PageHeader';
import TopNav from '../../containers/TopNav';
import QuickSearchBar from '../../containers/QuickSearchBar';

const TopBar = (props) => (
    <PageHeader>
        <Logo color={true} />
        <QuickSearchBar location={props.location} params={props.params} />
        <TopNav />
    </PageHeader>
)

TopBar.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default TopBar;
