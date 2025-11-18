import { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailValid, setEmailValid] = useState(null); // null = no validado, true = válido, false = inválido

  // Variables de entorno
  const showPlaceholders = import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true';
  
  // Función para obtener la URL base con conversión http -> https en producción
  const getBaseUrl = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    if (!serverUrl) return 'http://localhost:3000';
    
    let baseUrl = serverUrl.replace('/login', '');
    
    // Si estamos en producción (HTTPS) y la URL es HTTP, convertir a HTTPS
    if (window.location.protocol === 'https:' && baseUrl.startsWith('http://')) {
      baseUrl = baseUrl.replace('http://', 'https://');
    }
    
    return baseUrl;
  };
  
  const baseUrl = getBaseUrl();
  const loginUrl = `${baseUrl}/login`;
  const registerUrl = `${baseUrl}/register`;

  // Validar email en tiempo real
  const validateEmail = (emailValue) => {
    if (!emailValue) {
      setEmailValid(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(emailValue));
  };

  // Calcular fortaleza de contraseña
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    
    const levels = [
      { label: 'Muy débil', color: '#ef4444', strength: 0 },
      { label: 'Débil', color: '#f97316', strength: 1 },
      { label: 'Regular', color: '#eab308', strength: 2 },
      { label: 'Buena', color: '#22c55e', strength: 3 },
      { label: 'Fuerte', color: '#10b981', strength: 4 },
      { label: 'Muy fuerte', color: '#059669', strength: 5 }
    ];
    
    const levelIndex = Math.min(strength, 5);
    return { ...levels[levelIndex], strength: levelIndex };
  };

  const passwordStrength = !isLogin ? getPasswordStrength(password) : { strength: 0, label: '', color: '' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const url = isLogin ? loginUrl : registerUrl;
    const body = isLogin 
      ? { email, password }
      : { email, password, nombre: nombre || undefined };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const successMessage = isLogin 
          ? (data.message || '¡Inicio de sesión exitoso!')
          : (data.message || '¡Registro exitoso! Ya puedes iniciar sesión.');
        setSuccess(successMessage);
        console.log(isLogin ? 'Usuario autenticado:' : 'Usuario registrado:', data.user);
        
        // Si es login exitoso, redirigir al dashboard
        if (isLogin && data.user && onLogin) {
          setTimeout(() => {
            onLogin(data.user);
          }, 1000);
        }
        
        // Si es registro exitoso, cambiar a modo login
        if (!isLogin) {
          setTimeout(() => {
            setIsLogin(true);
            setNombre('');
            setPassword('');
            setSuccess('');
          }, 2000);
        }
      } else {
        // FastAPI devuelve errores con 'detail' en lugar de 'message'
        const errorMessage = data.detail || data.message || 
          (isLogin ? 'Error al iniciar sesión. Por favor, intenta de nuevo.' : 'Error al registrarse. Por favor, intenta de nuevo.');
        setError(errorMessage);
      }
    } catch (err) {
      // Manejo de errores de red o JSON inválido
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo y la URL sea correcta.');
      } else {
        setError('Error inesperado. Por favor, intenta de nuevo.');
      }
      console.error(`Error en ${isLogin ? 'login' : 'registro'}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setPassword('');
    setNombre('');
    setEmailValid(null);
  };

  return (
    <div className="login-container">
      <div className={`login-card ${isLogin ? 'login-mode' : 'register-mode'}`}>
        <div className="login-header">
          <div className="logo-circle">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1>{isLogin ? 'Bienvenido' : 'Crear Cuenta'}</h1>
          <p>{isLogin ? 'Inicia sesión en tu cuenta' : 'Regístrate para comenzar'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre (Opcional)</label>
              <div className="input-wrapper">
                <svg 
                  className="input-icon" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={showPlaceholders ? "Tu nombre" : ""}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-wrapper">
              <svg 
                className="input-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                placeholder={showPlaceholders ? "correo@ejemplo.com" : ""}
                autoComplete={isLogin ? "email" : "email"}
                className={emailValid === false ? 'input-invalid' : emailValid === true ? 'input-valid' : ''}
                required
              />
              {emailValid !== null && (
                <div className="input-validation-icon">
                  {emailValid ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <svg 
                className="input-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={showPlaceholders ? "••••••••" : ""}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {!isLogin && password && (
              <div className="password-strength">
                <div className="password-strength-bar">
                  <div 
                    className="password-strength-fill"
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color
                    }}
                  ></div>
                </div>
                <span className="password-strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="message error-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="message success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{success}</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading || (emailValid === false)}>
            {loading 
              ? (isLogin ? 'Iniciando sesión...' : 'Registrando...')
              : (isLogin ? 'Iniciar Sesión' : 'Registrarse')
            }
          </button>

          <div className="toggle-mode">
            <p>
              {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
              <button 
                type="button" 
                className="toggle-link"
                onClick={toggleMode}
                disabled={loading}
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
