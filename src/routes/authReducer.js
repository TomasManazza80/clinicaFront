const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;