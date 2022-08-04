import create from "zustand";

const useStore = create((set, get) => ({
	resourceSearch: "",
	setResourceSearch: (str) => {
		set(() => ({ resourceSearch: str }));
	},

	integrationSearch: "",
	setIntegrationSearch: (str) => {
		set(() => ({ integrationSearch: str }));
	},

	user: {
		email: "",
	},
	setUser: (user) => {
		set(() => ({ user }));
	},
}));

export default useStore;
