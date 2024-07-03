import { FC, createContext, useState } from 'react';
import PocketBase from 'pocketbase';
import './style.css';


export interface Tareas {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  nombre: string;
  estado: 'creada' | 'iniciada' | 'completada';
}

type ContextoContextType = {
  autenticar: () => Promise<void>;
  obtenerTareas: () => Promise<void>;
  eliminarTarea: (id: string) => void;
  agregarTarea: (textoTarea: string) => Promise<void>;
  actualizarTarea: (id: string, nuevoEstado: 'creada' | 'iniciada' | 'completada') => Promise<void>;
  tareas: Tareas[];
  pb: PocketBase;
};

export const ContextoContext = createContext<ContextoContextType>({} as ContextoContextType);

export const ContextoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tareas, setTareas] = useState<Tareas[]>([]);
  const pb = new PocketBase('http://127.0.0.1:8090');
  pb.autoCancellation(false);

  const autenticar = async () => {
    await pb.collection('users').authWithPassword('usuario', 'K-0ppbvY2HNIe6S');
    
  };

  const obtenerTareas = async () => {
    try {
      const listaTareas = await pb.collection<Tareas>('Tareasv2').getFullList();
      setTareas(listaTareas);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const eliminarTarea = async (id: string) => {
    await pb.collection<Tareas>('Tareasv2').delete(id);
    obtenerTareas();
  };

  const agregarTarea = async (textoTarea: string) => {
    const nuevaTarea = await pb.collection<Tareas>('Tareasv2').create({ nombre: textoTarea, estado: 'creada' });
    if (nuevaTarea) {
      setTareas([...tareas, nuevaTarea]);
    }
  };

  const actualizarTarea = async (id: string, nuevoEstado: 'creada' | 'iniciada' | 'completada') => {
    const tareaActualizada = await pb.collection<Tareas>('Tareasv2').update(id, { estado: nuevoEstado });
    if (tareaActualizada) {
      const nuevasTareas = tareas.map((tarea) => (tarea.id === id ? tareaActualizada : tarea));
      setTareas(nuevasTareas);
    }
  };

  return (
    <ContextoContext.Provider
      value={{ autenticar, eliminarTarea, obtenerTareas, agregarTarea, actualizarTarea, tareas, pb }}
    >
      {children}
    </ContextoContext.Provider>
  );
};

