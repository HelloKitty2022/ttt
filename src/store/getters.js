const getters = {  
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,

    website: state => state.common.website, 
    isFullScren: state => state.common.isFullScren,
    screen:state => state.common.screen
  }
  export default getters