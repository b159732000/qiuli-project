export const CLOSEMOREMENU = 'CLOSEMOREMENU';
export const OPENMOREMENU = 'OPENMOREMENU';
export const UPDATERENDERINGPAGE = 'UPDATERENDERINGPAGE'

export function closeMoreMenu() {
    return { type: CLOSEMOREMENU };
}

export function openMoreMenu() {
    return { type: OPENMOREMENU };
}

export function updateRenderingPage(PageWantToGoTo) {   //PageWantToGoTo:string
    return { type: UPDATERENDERINGPAGE, value: PageWantToGoTo}
}
