// consider alternatives for production
export const PROXY = "http://localhost:8080/";

export function createRoute(route: string): string {
    return `${PROXY}${route}`;
}
