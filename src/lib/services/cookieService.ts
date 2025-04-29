import { encrypt, decrypt } from './encryptionService';

const USAGE_COOKIE_NAME = 'blue_threads';
const VERIFICATION_STORAGE_KEY = 'red_paint';
const MAX_USES = 3;
const EXPIRATION_DAYS = 1;

function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}

function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function initializeUserTracking() {
    const encryptedUsage = encrypt('1');
    setCookie(USAGE_COOKIE_NAME, encryptedUsage, EXPIRATION_DAYS);
    localStorage.setItem(VERIFICATION_STORAGE_KEY, encrypt('true'));
}

export function getUsageCount(): number {
    const encryptedUsage = getCookie(USAGE_COOKIE_NAME);
    const storageVerification = localStorage.getItem(VERIFICATION_STORAGE_KEY);

    // Si no hay verificación en localStorage, es un usuario nuevo
    if (!storageVerification) {
        initializeUserTracking();
        return 1;
    }

    // Si hay verificación pero no cookie, usuario ha borrado la cookie
    if (!encryptedUsage) {
        return MAX_USES + 1; // Forzar que no pueda usar más
    }

    const decryptedUsage = decrypt(encryptedUsage);
    return parseInt(decryptedUsage) || 0;
}

export function incrementUsage(): boolean {
    const currentCount = getUsageCount();
    
    // Si el usuario ha borrado la cookie, no permitir más usos
    if (currentCount > MAX_USES) {
        return false;
    }

    const newCount = currentCount + 1;
    const encryptedUsage = encrypt(newCount.toString());
    setCookie(USAGE_COOKIE_NAME, encryptedUsage, EXPIRATION_DAYS);
    return true;
}

export function canCreateUrl(): boolean {
    return getUsageCount() < MAX_USES;
}

export function getRemainingUses(): number {
    const currentCount = getUsageCount();
    return currentCount > MAX_USES ? 0 : MAX_USES - currentCount;
} 