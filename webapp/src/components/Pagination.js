import React from 'react'



class Pagination extends Component {

  constructor(props) {
    super(props);
    this.static = 1
  }
  static propTypes = {
    pageCount: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired,

  }

  onPrevClick() {

  }

  onNextClick() {

  }

}
