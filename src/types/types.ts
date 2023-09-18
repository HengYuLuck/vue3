declare global {
    interface Window {
        g: any
    }
}

export interface ToastOptions {
    className?: string
    timeoutMs?: number
    message: string
    position?: 'bottom' | 'center' | 'top'
}
