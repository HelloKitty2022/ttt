import website from '@/config/website'
const common = {
    state: {
        isFullScren: false,
        website: website,
        screen: -1
    },
    mutations: {
        SET_FULLSCREN: (state) => {
        state.isFullScren = !state.isFullScren;
        },
        SET_SCREEN: (state,screen) => {
        state.screen = screen;
        }
    }
}
export default common