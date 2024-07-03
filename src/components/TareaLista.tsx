import React, { useContext, useEffect } from 'react';
import { ContextoContext, Tareas } from './Contexto';

interface TareaListaProps {
  estado: 'creada' | 'iniciada' | 'completada';
}

const TareaLista: React.FC<TareaListaProps> = ({ estado }) => {
  const { eliminarTarea, obtenerTareas, actualizarTarea, tareas, autenticar, pb } = useContext(ContextoContext);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      autenticar();
      obtenerTareas();
    } else {
      obtenerTareas();
    }
  }, []);

  const handleSelectChange = async (tarea: Tareas, nuevoEstado: 'creada' | 'iniciada' | 'completada') => {
    await actualizarTarea(tarea.id, nuevoEstado);
    obtenerTareas();
  };

  return (
   
 
   <ul >
  
      {tareas.filter((tarea) => tarea.estado === estado).map((tarea) => (
        <li key={tarea.id}>
          {tarea.nombre}
       
          <select className=''
            value={tarea.estado}
            onChange={(e) => handleSelectChange(tarea, e.target.value as 'creada' | 'iniciada' | 'completada')}
          >
       
            <option  value="creada">creada</option>
            <option value="iniciada">iniciada</option>
            <option value="completada">completada</option>
          
          </select>
       
          <button className="btn-eliminar" onClick={() => eliminarTarea(tarea.id)}>X</button>
        </li>
      ))}
      
    </ul>
   
  );
};

export default TareaLista;