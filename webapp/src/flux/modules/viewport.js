
export const SET_VIEWPORT = 'SET_VIEWPORT';

export const setViewport = width => ({type: SET_VIEWPORT, payload: {width}});

const initialState = {
  isMobile: false,
  isTablet: false,
  isTouchDevice: 'ontouchstart' in window || 'onmsgesturechange' in window,
  isDesktop: true,
}

const viewPortReducer = (state = initialState, action) => {
  switch(action.type) {
      case (SET_VIEWPORT):
        return Object.assign({}, state, {
          isTouchDevice: 'ontouchstart' in window || 'onmsgesturechange' in window,
          isMobile: action.payload.width < 768,
          isTablet: action.payload.width  >= 768 && action.payload.width < 1024,
          isDesktop: action.payload.width >= 1024
        })
      default: return state;
    }
}

export default viewPortReducer;

/** USE:
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.debouncedHandleResize = _.debounce(() => {this.handleResize(); }, 100);
  }
  handleResize() {
    store.dispatch(setViewport(window.innerWidth));
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.debouncedHandleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
  }
  *///
