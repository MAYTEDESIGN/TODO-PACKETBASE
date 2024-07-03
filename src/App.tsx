import React, { useContext, useEffect, useState } from 'react';
// import './style.css';
import TareaForm from './components/TareaForm';
import TareaLista from './components/TareaLista';
import { ContextoProvider } from './components/Contexto';

const App: React.FC = () => {
  return (
    <ContextoProvider>
      <div className="contenedor-principal">
        <h1>Lista de Tareas: Mayte</h1>
        <TareaForm />
        <div className="listas">
          <div className="lista-1">
            <h3>Tarea Creada</h3>
            <TareaLista estado="creada" />
          </div>
          <div className="lista-2">
            <h3>Tarea Iniciada</h3>
            <TareaLista estado="iniciada" />
          </div>
          <div className="lista-3">
            <h3>Tarea completada</h3>
            <TareaLista estado="completada" />
          </div>
        </div>
      </div>
    </ContextoProvider>
  );
};

export default App;