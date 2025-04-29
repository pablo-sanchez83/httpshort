import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { canCreateUrl, incrementUsage } from './cookieService';

export async function createShortUrl(originalUrl: string): Promise<string> {
    try {
        if (!canCreateUrl()) {
            throw new Error('Has alcanzado el límite de URLs por día');
        }

        // Generar un código corto único
        const shortCode = generateShortCode();
        
        // Calcular la fecha de expiración (24 horas desde ahora)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
        
        // Guardar en Firestore
        const docRef = await addDoc(collection(db, 'urls'), {
            originalUrl,
            shortCode,
            createdAt: new Date(),
            expiresAt
        });

        // Incrementar el contador de uso
        if (!incrementUsage()) {
            throw new Error('Error al registrar el uso');
        }

        // Retornar la URL acortada
        return `${window.location.origin}/${shortCode}`;
    } catch (error) {
        console.error('Error al crear URL corta:', error);
        throw error;
    }
}

function generateShortCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function getOriginalUrl(shortCode: string): Promise<string | null> {
    try {
        const q = query(collection(db, 'urls'), where('shortCode', '==', shortCode));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            
            // Verificar si la URL ha expirado
            if (data.expiresAt && new Date(data.expiresAt.toDate()) < new Date()) {
                return null;
            }
            
            return data.originalUrl;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener URL original:', error);
        throw error;
    }
} 