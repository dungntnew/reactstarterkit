import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
    desktop: '(min-width: 1025px)',
    tablet: '(min-width: 768px) and (max-width: 1024px)',
    phone: '(max-width: 767px)',
    desktopAndTablet: '(min-width: 768px)',
}

const BreakPoint = (props) => {
    const breakpoint = breakpoints[props.name] || breakpoints.desktop;

    const {children} = props
    if (!children) return null;
    return (
        <MediaQuery {...props} query={breakpoint}>
        {children}
        </MediaQuery>
    )
}

BreakPoint.propTypes = {
    name: PropTypes.string,
}

export default BreakPoint;