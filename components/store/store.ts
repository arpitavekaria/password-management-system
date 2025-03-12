import { create } from "zustand";



// Define types for the Zustand store state and actions
interface PositionState {
    position: "ltr" | "rtl"; // Position types
    moveLeft: () => void;
    moveRight: () => void;
}

// Zustand store with persistence middleware for position
const usePositionStore = create<PositionState>((set, get) => {
    // Access the loader store

    // Check if we are in the browser environment before accessing localStorage
    const savedPosition =
        typeof window !== "undefined" ? localStorage.getItem("direction") as "ltr" | "rtl" | null : null;

    return {
        position: savedPosition || "ltr", // Set initial position state from localStorage or default to "ltr"
        moveLeft: () => {
            set({ position: "ltr" }); // Update state to 'ltr'
            if (typeof window !== "undefined") {
                localStorage.setItem("direction", "ltr"); // Persist in localStorage
            }
        },
        moveRight: () => {
            set({ position: "rtl" }); // Update state to 'rtl'
            if (typeof window !== "undefined") {
                localStorage.setItem("direction", "rtl"); // Persist in localStorage
            }
        },
    };
});

export { usePositionStore };


