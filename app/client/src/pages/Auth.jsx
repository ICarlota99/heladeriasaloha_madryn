import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_orange.svg';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Handle form submission (login or register)
        console.log(isLogin ? 'Logging in...' : 'Registering...', formData);
    };

    return (
        <section id='auth' className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <div className='text-center mb-4'>
                        <img src={logo} alt='logo' className='w-50'/>
                    </div>
                    
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h2 className='text-center mb-4'>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='email' className='form-label'>Correo electrónico</label>
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
                                    <label htmlFor='password' className='form-label'>Contraseña</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        placeholder='••••••••'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                {!isLogin && (
                                    <div className='mb-3'>
                                        <label htmlFor='confirmPassword' className='form-label'>Confirmar contraseña</label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='••••••••'
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}
                                
                                <button 
                                    type='submit' 
                                    className='btn btn-dark w-100 py-2 mb-3'
                                >
                                    {isLogin ? 'Iniciar sesión' : 'Registrarse'}
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