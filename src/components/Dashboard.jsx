import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>¡Bienvenido, {user?.nombre || user?.email?.split('@')[0] || 'Usuario'}! 👋</h1>
            <p className="welcome-subtitle">Has iniciado sesión correctamente</p>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {/* Card de Información del Usuario */}
          <div className="dashboard-card user-card">
            <div className="card-header">
              <div className="card-icon user-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2>Información del Usuario</h2>
            </div>
            <div className="card-content">
              <div className="info-item">
                <span className="info-label">Nombre:</span>
                <span className="info-value">{user?.nombre || 'No especificado'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email || 'No disponible'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">ID de Usuario:</span>
                <span className="info-value">#{user?.id || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Card de Fecha y Hora */}
          <div className="dashboard-card time-card">
            <div className="card-header">
              <div className="card-icon clock-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h2>Fecha y Hora</h2>
            </div>
            <div className="card-content">
              <div className="time-display">
                <div className="time-value">{formatTime(currentTime)}</div>
                <div className="date-value">{formatDate(currentTime)}</div>
              </div>
            </div>
          </div>

          {/* Card de Estadísticas */}
          <div className="dashboard-card stats-card">
            <div className="card-header">
              <div className="card-icon stats-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="20" x2="12" y2="10"></line>
                  <line x1="18" y1="20" x2="18" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
              </div>
              <h2>Estadísticas</h2>
            </div>
            <div className="card-content">
              <div className="stat-item">
                <span className="stat-label">Sesión activa</span>
                <span className="stat-value">✓</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Estado</span>
                <span className="stat-value status-active">Activo</span>
              </div>
            </div>
          </div>

          {/* Card de Acciones Rápidas */}
          <div className="dashboard-card actions-card">
            <div className="card-header">
              <div className="card-icon actions-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h2>Acciones Rápidas</h2>
            </div>
            <div className="card-content">
              <div className="actions-list">
                <button className="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Perfil
                </button>
                <button className="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Configuración
                </button>
                <button className="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Ayuda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

