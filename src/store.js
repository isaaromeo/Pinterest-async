// src/store.js
export const store = {
    state: {
        currentPage: "Home",
        query: "random",
    },

    setState(newState) {
        console.log("updating new state: ", newState)
        this.state = { ...this.state, ...newState };
        this.notify();
    },

    subscribers: [],

    subscribe(callback) {
        this.subscribers.push(callback);
    },

    notify() {
        this.subscribers.forEach((callback) => callback(this.state));
    },
};