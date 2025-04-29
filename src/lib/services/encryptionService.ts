const ENCRYPTION_KEY = 'acortador_de_hilos_azules';

function generateKey(): string {
    return btoa(ENCRYPTION_KEY + Date.now().toString());
}

export function encrypt(data: string): string {
    const key = generateKey();
    let result = '';
    for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return btoa(result);
}

export function decrypt(encryptedData: string): string {
    try {
        const decodedData = atob(encryptedData);
        const key = generateKey();
        let result = '';
        for (let i = 0; i < decodedData.length; i++) {
            const charCode = decodedData.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch (e) {
        return '';
    }
} 