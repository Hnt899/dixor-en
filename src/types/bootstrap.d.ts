declare module 'bootstrap/dist/js/bootstrap.bundle.min.js';
declare module 'bootstrap/js/dist/tab' {
    export class Tab {
        constructor(element: HTMLElement | string);
        show(): void;
        hide(): void;
        dispose(): void;
    }
}