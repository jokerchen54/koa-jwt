// import { ActionContext } from '@/store/helper';

const createState = () => {
  const store = {
    isMapLoaded: false,
  };
  return store;
};
export type mapState = ReturnType<typeof createState>;

const getters = {
  isMapLoaded: (state: mapState): string => `${state.isMapLoaded}`,
};

const mutations = {
  set_isMapLoaded: (state: mapState, payload: boolean): void => {
    console.log('ditu', payload);
    state.isMapLoaded = payload;
  },
};

const actions = {

};

export default {
  namespaced: true,
  state: createState(),
  getters,
  mutations,
  actions,
};
