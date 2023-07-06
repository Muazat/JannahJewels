import { defineStore, acceptHMRUpdate } from "pinia";
// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore("main", {
  // a function that returns a fresh state
  state: () => ({
    loadedAssignment: {},
    loadedNote: {},
    loadedTask: {},
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    getLoadedAssignment: (state) => state.loadedAssignment,
    // use getters in other getters
    getLoadedNote(state) {
      return state.loadedNote;
    },
    getLoadedTask(state) {
      return state.loadedTask;
    },
  },
  // optional actions
  actions: {
    setLoadedAssignment(assignment) {
      this.loadedAssignment = assignment;
    },
    setLoadedNote(note) {
      this.loadedNote = note;
    },
    setLoadedTask(task) {
      this.loadedTask = task;
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
