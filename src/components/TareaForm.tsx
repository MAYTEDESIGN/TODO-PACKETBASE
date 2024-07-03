import React, { useContext, useState } from 'react';
import { ContextoContext } from './Contexto';

const TareaForm: React.FC = () => {
  const { agregarTarea } = useContext(ContextoContext);
  const [textoTarea, setTextoTarea] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoTarea(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textoTarea.trim()) return;
    try {
      await agregarTarea(textoTarea);
      setTextoTarea('');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  return (
    <form className="d-flex align-items-stretch" onSubmit={handleSubmit}>
      <div className='caja'>
      <input type="text" placeholder="Ingresar Nueva tarea" value={textoTarea} onChange={handleChange} />
      </div>
      <button className="btn-agregar"  type="submit">+</button>
    </form>
  );
};

export default TareaForm;
