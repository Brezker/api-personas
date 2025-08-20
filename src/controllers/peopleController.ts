import { personas } from '../configs/data-source';

export async function obtenerPersonas(): Promise<typeof personas> {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(personas);
        }, 1000);
    });
}