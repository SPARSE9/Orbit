// --- Firebase Imports ---
// Note: This file is intended to be imported into a client-side application (like React).
// For that reason, it uses the modular 'firebase/...' imports.
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

// --- GLOBAL VARIABLES (Provided by Canvas Environment) ---
// These are expected to be available in the global scope where this script runs.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

// --- FIRESTORE PATHS ---
const USER_PROFILE_COLLECTION_PATH = `/artifacts/${appId}/users`; 
const PUBLIC_EVENTS_PATH = `/artifacts/${appId}/public/data/events`;
const PEOPLE_FINDER_COLLECTION_PATH = `/artifacts/${appId}/public/data/eventConnections`;

// --- MOCK DATA / CONSTANTS ---
const INITIAL_USER_DATA = {
    name: 'Astronaut',
    interests: ['Rock Climbing', 'Jazz Music', 'Astrophysics'],
    location: { lat: 34.0522, lng: -118.2437 }, // Mock LA coordinates
};


// --- FIREBASE SERVICE CLASS ---

/**
 * Manages all Firestore interactions and simulates backend event filtering logic.
 * This class runs in the client (browser) and talks directly to Firestore.
 */
export class FirebaseService {
    constructor(dbInstance, authInstance, userId) {
        this.db = dbInstance;
        this.auth = authInstance;
        this.userId = userId;
        this.userProfile = null;
        this.surpriseDate = null; // Stores the selected surprise date
    }

    // --- MOCKING / UTILITIES ---

    /** Creates a mock event object for initial database population. */
    getMockEvent(id, primary, secondary, distanceKm) {
        const baseTime = Date.now() + (id * 3600000); // Stagger events an hour apart
        return {
            id: `e${id}`,
            title: `${primary} Mixer: The ${secondary} Edition`,
            description: `A unique mashup event focused on ${primary} but with a ${secondary} twist.`,
            primaryInterest: primary,
            secondaryInterest: secondary,
            distance: distanceKm,
            location: { lat: INITIAL_USER_DATA.location.lat + (id * 0.01), lng: INITIAL_USER_DATA.location.lng - (id * 0.01) },
            startTime: baseTime,
            hostId: 'mock-host',
            websiteUrl: `https://mockevent.orbit/${id}` // Added mock website URL
        };
    }

    // --- PROFILE MANAGEMENT ---

    getProfileDocRef() {
        // Path: /artifacts/{appId}/users/{userId}/profile/data
        return doc(this.db, USER_PROFILE_COLLECTION_PATH, this.userId, 'profile', 'data');
    }

    async saveProfile(profileData) {
        try {
            await setDoc(this.getProfileDocRef(), profileData);
            console.log("Profile saved successfully.");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    }

    /** Subscribes to profile changes and updates the callback. */
    onProfileChange(callback) {
        const docRef = this.getProfileDocRef();
        return onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                this.userProfile = doc.data(); // Update local profile reference
                callback(doc.data());
            } else {
                // If no profile exists, create the initial one
                this.userProfile = INITIAL_USER_DATA;
                callback(INITIAL_USER_DATA);
                this.saveProfile(INITIAL_USER_DATA); 
            }
        }, (error) => {
            console.error("Error listening to profile:", error);
        });
    }

    // --- EVENT DISCOVERY (Query Simulation) ---

    getEventsCollectionRef() {
        return collection(this.db, PUBLIC_EVENTS_PATH);
    }
    
    /** Fetches all mock events from Firestore for client-side filtering. */
    async fetchAllEventsForFiltering() {
        try {
            const snapshot = await getDocs(this.getEventsCollectionRef());
            // Simulates fetching events and transforming them
            return snapshot.docs.map(d => ({ ...d.data(), firestoreId: d.id }));
        } catch (error) {
            console.error("Error fetching all events:", error);
            return [];
        }
    }

    // --- FILTERS (Simulating logic from EventDiscoveryService.js) ---

    // 1. Recommended
    async fetchRecommendedEvents(userInterests) {
        const events = await this.fetchAllEventsForFiltering();
        const filtered = events.filter(e => userInterests.includes(e.primaryInterest));
        return filtered.sort((a, b) => a.distance - b.distance).map(e => ({...e, type: 'RECOMMENDED'}));
    }
    
    // 2. Mashup
    async fetchMashupEvents(userInterests) {
        const events = await this.fetchAllEventsForFiltering();
        const filtered = events.filter(e => 
            e.secondaryInterest && 
            e.secondaryInterest !== 'N/A' &&
            userInterests.includes(e.primaryInterest) && 
            userInterests.includes(e.secondaryInterest)
        );
        return filtered.sort((a, b) => a.distance - b.distance).map(e => ({...e, type: 'MASHUP'}));
    }

    // 3. Deep Space
    async fetchDeepSpaceSignals(userInterests) {
        const events = await this.fetchAllEventsForFiltering();
        const filtered = events.filter(e => 
            !userInterests.includes(e.primaryInterest)
        );
        return filtered.sort((a, b) => a.distance - b.distance).map(e => ({...e, type: 'DEEP_SPACE'}));
    }
    
    // 4. Surprise Me Day (SIMULATION LOGIC)
    
    /** Sets the date for the surprise event query. */
    selectSurpriseDate(dateString) {
        this.surpriseDate = dateString;
        console.log(`Surprise date set to: ${dateString}`);
    }

    /** Simulates fetching a surprise event for the selected date. */
    async fetchSurpriseEventOnDate(userInterests) {
        // If no date has been selected, return a prompt.
        if (!this.surpriseDate) {
            return [{ 
                id: 'prompt', 
                type: 'PROMPT', 
                title: 'Select a Date', 
                description: 'Please pick a day on the calendar above to find a surprise event.' 
            }];
        }

        const events = await this.fetchAllEventsForFiltering();
        
        // Filter: Find events *outside* user's interests (like Deep Space)
        const candidates = events.filter(e => !userInterests.includes(e.primaryInterest));

        // If no candidates, return empty message for that date.
        if (candidates.length === 0) {
            return [{ 
                id: 'empty', 
                type: 'EMPTY', 
                title: 'No Events Found', 
                description: `We couldn't find any surprise events for ${this.surpriseDate}. Try another day!` 
            }];
        }

        // Pick the "best" one (mocking rank) and pretend it's for that date.
        // In this simulation, we just pick the first one found.
        const surpriseEvent = { 
            ...candidates[0], // Just pick the first non-interest event as a mock
            type: 'SURPRISE_DAY', 
            title: `Surprise Event for ${this.surpriseDate}`, 
            description: `This is your surprise event for the selected date! (Based on: ${candidates[0].title})`,
            // This is the key: It uses the stored date to create a new start time
            startTime: new Date(this.surpriseDate).getTime() + 3600000 * 18 // Mock time: 6 PM on that day
        };

        return [surpriseEvent];
    }


    // 5. People Finder (Social Feature)
    onPeopleFinderChange(eventId, callback) {
        const q = query(
            collection(this.db, PEOPLE_FINDER_COLLECTION_PATH),
            where('eventId', '==', eventId)
        );
        return onSnapshot(q, (snapshot) => {
            const connections = snapshot.docs.map(d => d.data());
            callback(connections);
        });
    }

    async logInterest(eventId) {
        // This requires the user's name, ensure profile is loaded
        if (!this.userProfile || !this.userProfile.name) {
            console.error("Cannot log interest, user profile not loaded.");
            return;
        }

        const connectionId = `${eventId}_${this.userId}`;
        const docRef = doc(this.db, PEOPLE_FINDER_COLLECTION_PATH, connectionId);
        try {
            await setDoc(docRef, {
                eventId: eventId,
                userId: this.userId,
                userName: this.userProfile.name, 
                timestamp: Date.now()
            });
        } catch (error) {
            console.error("Error logging interest:", error);
        }
    }

    async removeInterest(eventId) {
        const connectionId = `${eventId}_${this.userId}`;
        const docRef = doc(this.db, PEOPLE_FINDER_COLLECTION_PATH, connectionId);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Error removing interest:", error);
        }
    }
}