// EventDiscoveryService.js - A standalone Node.js/JS module for Orbit's backend event fetching.

// NOTE: This file assumes a Node.js environment where the global 'fetch' function is available
// or polyfilled. The logic within this file is designed to run on your application's server.

// --- CONFIGURATION ---
const PREDICTHQ_API_KEY = 'cxKv0VCGJwWuSIvVCKiuZJaqvDBYjk-F2pm1OwxO'; // NOTE: Placeholder key
const PREDICTHQ_BASE_URL = 'https://api.predicthq.com/v1/events/';

// Mock User Location (for API query) - We use Los Angeles as a mock center.
const MOCK_USER_LOCATION = { lat: 34.0522, lng: -118.2437 }; 
const SEARCH_RADIUS_KM = 50;

// Mapping user interests to PredictHQ categories for search relevance.
const INTEREST_TO_CATEGORY_MAP = {
    'Rock Climbing': 'sports',
    'Jazz Music': 'concerts',
    'Vegan Cooking': 'food_drink',
    'Gardening': 'community',
    'Art': 'arts_culture',
    'Yoga': 'community',
    'Astrophysics': 'conferences,expos',
    'Board Games': 'community',
    'Sci-Fi': 'movies',
    'Fishing': 'sports',
    DEFAULT: 'community,performing_arts,sports,conferences' // Broad categories for mashup/surprise
};

// --- UTILITIES ---

/**
 * Calculates distance (Haversine formula).
 * @param {Object} loc1 - { lat, lng }
 * @param {Object} loc2 - { lat, lng }
 * @returns {string} Distance in kilometers, fixed to one decimal place.
 */
const getDistance = (loc1, loc2) => {
  const R = 6371; // Earth radius in km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLon = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

/**
 * Transforms a PredictHQ event object into the simplified Orbit format.
 * Assigns a mock 'interest' based on category for filtering purposes.
 * @param {Object} phqEvent - Raw event object from PredictHQ.
 */
const transformEvent = (phqEvent) => {
    // --- Mocking logic to categorize PHQ events into Orbit interests ---
    let primaryInterest = 'Community';
    let secondaryInterest = null;

    if (phqEvent.category.includes('concerts')) primaryInterest = 'Jazz Music';
    else if (phqEvent.category.includes('sports')) primaryInterest = 'Rock Climbing';
    else if (phqEvent.category.includes('food_drink')) primaryInterest = 'Vegan Cooking';
    else if (phqEvent.category.includes('arts')) primaryInterest = 'Art';
    
    // Assign a mock secondary interest for 'When Worlds Collide' logic
    if (phqEvent.labels.length > 1) {
        secondaryInterest = phqEvent.labels[0].includes('conference') ? 'Astrophysics' : 'Yoga'; 
        if (secondaryInterest === primaryInterest) secondaryInterest = 'Sci-Fi'; 
    } else {
        secondaryInterest = 'N/A';
    }
    // --- End Mocking Logic ---

    const eventLat = phqEvent.location[1];
    const eventLng = phqEvent.location[0];
    const distance = getDistance(MOCK_USER_LOCATION, { lat: eventLat, lng: eventLng });

    return {
        id: phqEvent.id,
        title: phqEvent.title,
        description: phqEvent.description || `A public event categorized as ${phqEvent.category}.`,
        primaryInterest: primaryInterest,
        secondaryInterest: secondaryInterest,
        location: { lat: eventLat, lng: eventLng, address: phqEvent.entities[0]?.name || 'Unknown Venue' },
        startTime: new Date(phqEvent.start).getTime(),
        distance: parseFloat(distance),
        category: phqEvent.category,
        rank: phqEvent.rank || 0,
        type: 'RECOMMENDED',
        websiteUrl: phqEvent.url || null, // Capture the event's URL for display
    };
};

// --- PREDICTHQ SERVICE CLASS ---

/**
 * Handles direct communication with the PredictHQ API.
 */
class PredictHQService {
    constructor() {
        this.headers = {
            'Authorization': `Bearer ${PREDICTHQ_API_KEY}`,
            'Accept': 'application/json'
        };
    }

    /**
     * Executes a search against the PredictHQ API.
     * @param {string} categories - Comma-separated list of PHQ categories.
     * @param {string} dateFilter - Optional date string (YYYY-MM-DD) or 'now'.
     * @param {string} searchTitle - Optional title keyword for exact search.
     */
    async fetchPHQEvents(categories, dateFilter = 'now', searchTitle = null) {
        const params = new URLSearchParams({
            'category': categories,
            // Logic to handle date filter:
            // If 'now', use 'active.from=now' to get currently active/upcoming events
            'active.from': dateFilter === 'now' ? 'now' : undefined,
            // If a specific date, use 'start.gte' and 'start.lte' to bound the search
            'start.gte': dateFilter !== 'now' ? `${dateFilter}T00:00:00Z` : undefined,
            'start.lte': dateFilter !== 'now' ? `${dateFilter}T23:59:59Z` : undefined,
            'q': searchTitle || undefined,
            'limit': 50,
            'sort': 'rank', 
            'within': `${SEARCH_RADIUS_KM}km@${MOCK_USER_LOCATION.lat},${MOCK_USER_LOCATION.lng}`
        });

        // Clean up undefined params
        const queryString = params.toString().replace(/&undefined/g, '').replace(/=undefined/g, '');
        const url = `${PREDICTHQ_BASE_URL}?${queryString}`;

        try {
            const response = await fetch(url, { headers: this.headers });
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`PredictHQ API failed with status ${response.status}. Response: ${errorBody}`);
            }
            const data = await response.json();
            
            return data.results.map(transformEvent);
        } catch (error) {
            console.error('Error fetching events from PredictHQ (PHQService):', error.message);
            return []; 
        }
    }
}

// --- ORBIT BACKEND SIMULATOR CLASS (Integrates PHQ and Orbit Logic) ---

/**
 * Simulates the full backend logic for event filtering and user-event validation.
 * This class would be instantiated and run on your server.
 */
class OrbitBackendSimulator {
    constructor(userInterests = []) {
        this.phqService = new PredictHQService();
        this.userInterests = userInterests;
        this.surpriseDate = null; // Stores date from selectSurpriseDate
    }

    /**
     * PUBLIC METHOD: Sets the user's preferred date for a Surprise Me Day event.
     * A frontend would call this endpoint before calling fetchSurpriseEventOnDate.
     * @param {string} dateString - Date in YYYY-MM-DD format.
     */
    selectSurpriseDate(dateString) {
        // Add basic validation for the date string format if desired
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            console.warn(`Invalid date string format received: ${dateString}. Expected YYYY-MM-DD.`);
            return;
        }
        this.surpriseDate = dateString; 
        console.log(`Surprise Me Day scheduled for: ${this.surpriseDate}`);
    }
    
    /**
     * Vetting function for user-submitted events to prevent fakes.
     * Simulates checking location, time, and cross-referencing PredictHQ data.
     * @param {Object} eventData - Data submitted by a user for a new event.
     */
    async validateUserCreatedEvent(eventData) {
        // 1. Basic Validation
        if (!eventData.title || eventData.title.length < 5) {
            return { valid: false, reason: "Title is too short or missing." };
        }
        if (new Date(eventData.startTime).getTime() <= Date.now()) {
             return { valid: false, reason: "Event must be scheduled for a future date." };
        }
        
        // 2. Cross-Reference Check (Preventing fakes that mimic major verified events)
        try {
            const categories = INTEREST_TO_CATEGORY_MAP[eventData.primaryInterest] || INTEREST_TO_CATEGORY_MAP.DEFAULT;
            // Check for events with the same title *today*
            const existingEvents = await this.phqService.fetchPHQEvents(categories, 'now', eventData.title);

            if (existingEvents.length > 0) {
                return { 
                    valid: true, 
                    reason: "Event is valid but may require manual moderator review due to potential conflict with verified data.",
                    requiresModeration: true 
                };
            }
        } catch (error) {
            // Log the error but don't fail validation just because the check failed.
            console.error("Warning: PHQ cross-reference check failed during validation.", error);
        }
        
        return { valid: true, reason: "Event passed automated verification and can be published." };
    }


    /**
     * 1. Recommended Events: Fetches events matching user interests (Primary Orbit).
     */
    async fetchRecommendedEvents(userInterests = this.userInterests) {
        const phqCategories = userInterests
            .map(interest => INTEREST_TO_CATEGORY_MAP[interest] || '')
            .filter(c => c)
            .join(',');

        // If no interests map to categories, return empty
        if (!phqCategories) {
            return [];
        }

        const events = await this.phqService.fetchPHQEvents(phqCategories, 'now');
        events.sort((a, b) => a.distance - b.distance);
        
        return events.map(e => ({...e, type: 'RECOMMENDED'}));
    }

    /**
     * 2. "When Worlds Collide" (Mashup): Filters events where two user interests align.
     */
    async fetchMashupEvents(userInterests = this.userInterests) {
        const broadCategories = INTEREST_TO_CATEGORY_MAP.DEFAULT;
        const allCandidates = await this.phqService.fetchPHQEvents(broadCategories, 'now');

        // Filter: Primary and Secondary interest must both be in the user's saved interests
        const mashupEvents = allCandidates.filter(event =>
            event.secondaryInterest && event.secondaryInterest !== 'N/A' &&
            userInterests.includes(event.primaryInterest) && 
            userInterests.includes(event.secondaryInterest)
        ).map(e => ({...e, type: 'MASHUP'}));

        mashupEvents.sort((a, b) => a.distance - b.distance);
        return mashupEvents;
    }
    
    /**
     * 3. "Deep Space Signal": Filters events whose primary interest is *not* in the user's list.
     */
    async fetchDeepSpaceSignals(userInterests = this.userInterests) {
        const broadCategories = INTEREST_TO_CATEGORY_MAP.DEFAULT;
        const allCandidates = await this.phqService.fetchPHQEvents(broadCategories, 'now');

        // Filter: Primary interest MUST NOT be in user interests
        const deepSpaceEvents = allCandidates.filter(event =>
            !userInterests.includes(event.primaryInterest)
        ).map(e => ({...e, type: 'DEEP_SPACE'}));

        deepSpaceEvents.sort((a, b) => a.distance - b.distance);
        return deepSpaceEvents;
    }

    /**
     * 4. "Surprise Me Day": Fetches a single, non-interest event on the selected date.
     * This method relies on 'selectSurpriseDate' having been called first.
     */
    async fetchSurpriseEventOnDate(userInterests = this.userInterests) {
        // Uses the date stored in 'this.surpriseDate'
        const dateString = this.surpriseDate;
        
        if (!dateString) {
            console.warn("fetchSurpriseEventOnDate called, but no surprise date was selected.");
            return []; // No date scheduled
        }
        
        const broadCategories = INTEREST_TO_CATEGORY_MAP.DEFAULT;
        // This is the key: It passes the specific dateString to the API service.
        const allCandidates = await this.phqService.fetchPHQEvents(broadCategories, dateString);

        // Filter events not in the user's primary orbit
        const nonInterestCandidates = allCandidates.filter(event =>
            !userInterests.includes(event.primaryInterest)
        );
        
        // Sort by PHQ rank (quality) and pick the single best one
        nonInterestCandidates.sort((a, b) => (b.rank || 0) - (a.rank || 0) || a.distance - b.distance);

        // Return just the top-ranked event for that day
        return nonInterestCandidates.slice(0, 1).map(e => ({...e, type: 'SURPRISE_DAY'}));
    }
}