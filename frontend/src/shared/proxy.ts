// consider alternatives for production
export const PROXY = "http://localhost:3001/";

export function createRoute(route: string): string {
    return `${PROXY}${route}`;
}
