import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo_orange.svg';

const Auth = () => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',       // Nuevo campo añadido
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!isLogin) {
            if (!formData.name.trim()) {
                toast.error("El nombre es requerido");
                return false;
            }
            
            if (formData.password.length < 8) {
                toast.error("La contraseña debe tener al menos 8 caracteres");
                return false;
            }
            
            if (formData.password !== formData.confirmPassword) {
                toast.error("Las contraseñas no coinciden!");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const requestBody = isLogin 
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Algo salió mal');

            if (isLogin) {
                toast.success('¡Inicio de sesión exitoso!');
                login();
                if (data.token) localStorage.setItem('token', data.token);
            } else {
                toast.success(data.message || 'Registro exitoso. Verifica tu email.');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id='auth' className='container my-5'>
            <ToastContainer position="top-center" autoClose={5000} />
            
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <div className='text-center mb-4'>
                        <img src={logo} alt='logo' className='w-50'/>
                    </div>
                    
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h2 className='text-center mb-4'>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
                            
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className='mb-3'>
                                        <label htmlFor='name' className='form-label'>Nombre *</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Tu nombre'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            minLength={3}
                                        />
                                    </div>
                                )}
                                
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>Correo electrónico *</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        placeholder='ejemplo@gmail.com'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className='mb-3'>
                                    <label htmlFor='password' className='form-label'>Contraseña *</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        placeholder='•••••••• (mínimo 8 caracteres)'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                    />
                                    {!isLogin && (
                                        <small className="text-muted">Mínimo 8 caracteres</small>
                                    )}
                                </div>
                                
                                {!isLogin && (
                                    <div className='mb-3'>
                                        <label htmlFor='confirmPassword' className='form-label'>Confirmar contraseña *</label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='••••••••'
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                )}
                                
                                <button 
                                    type='submit' 
                                    className='btn btn-dark w-100 py-2 mb-3'
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        isLogin ? 'Iniciar sesión' : 'Registrarse'
                                    )}
                                </button>
                                
                                <div className='text-center mb-3'>
                                    <button 
                                        type='button' 
                                        className='btn btn-link hvr-black'
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin ? 
                                            '¿No tienes cuenta? Regístrate' : 
                                            '¿Ya tienes cuenta? Inicia sesión'}
                                    </button>
                                </div>
                            </form>
                            
                            {isLogin && (
                                <div className='text-center'>
                                    <Link to="/restore_password" className='text-decoration-none hvr-black'>
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;