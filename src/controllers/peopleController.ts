import { resolve } from 'path';
import { personas } from '../configs/data-source';

export async function obtenerPersonas(): Promise<typeof personas> {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(personas);
        }, 1000);
    });
}

export async function obtenerPersonaPorId(id: number) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const persona = personas.find(p => p.id === id);
            resolve(persona);
        }, 500);
    });
}

export async function crearPersona(nuevaPersona:{nombre: string; edad: number; correo: string }) {
    return new Promise((resolve) => {
        setTimeout(() => {
        const nuevoId = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
        const personaConId = { id: nuevoId, ...nuevaPersona };
        personas.push(personaConId);
        resolve(personaConId);
        }, 500);
    });
}

export async function editPerson(personToEdit: { id: number; nombre: string; edad: number; correo: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = personas.findIndex(p => p.id === personToEdit.id);

      if (index === -1) {
        return reject(new Error('Persona no encontrada'));
      }

      personas[index] = { ...personToEdit };

      resolve(personas[index]);
    }, 500);
  });
}

export async function deletePerson(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = personas.findIndex(p => p.id === id);

      if (index === -1) {
        return reject(new Error('Persona no encontrada'));
      }

      const personaEliminada = personas.splice(index, 1)[0];
      resolve(personaEliminada);
    }, 500);
  });
}

