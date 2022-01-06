import { createStore, createLogger } from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import common, { commonState } from './modules/common';
import map, { mapState } from './modules/map';

const debug = process.env.NODE_ENV !== 'production';

export interface State {
    common: commonState;
    map: mapState;
}

export const modules = {
  common,
  map,
};

export default createStore<State>({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

// 以下支持数据持久化
/*
const options = {
    key: 'mk-site-vuex',
    storage: window.sessionStorage
};

export default createStore<State>({
    modules,
    strict: debug,
    plugins: debug ? [createLogger(), createPersistedState(options)] : [createPersistedState(options)]
});
*/
