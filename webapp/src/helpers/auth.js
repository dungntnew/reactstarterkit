//auth.js
import $ from 'jquery';

const auth = {
    
    logout: function() {
        localStorage.clear();
    },

    loggedIn: function() {
        return !!localStorage.getItem('access-token');
    }
}

export default auth;