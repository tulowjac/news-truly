import { ContentRepo } from "./ContentRepo";
import { MockContentRepo } from "./MockContentRepo";
// import { WPContentRepo } from "./WPContentRepo";

const USE_MOCK = process.env.USE_MOCK_DATA === 'true' || true; // Force mock for now until WP is wired

let repoInstance: ContentRepo | null = null;

export function getContentRepo(): ContentRepo {
    if (repoInstance) return repoInstance;

    if (USE_MOCK) {
        repoInstance = new MockContentRepo();
    } else {
        // repoInstance = new WPContentRepo();
        repoInstance = new MockContentRepo(); // Fallback
    }

    return repoInstance;
}
