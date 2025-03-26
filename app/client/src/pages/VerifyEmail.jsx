import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo_orange.svg';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          throw new Error('No verification token provided');
        }

        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verificación fallida');
        }

        toast.success(data.message || 'Cuenta verificada correctamente!');
        setTimeout(() => navigate('/'), 5000); // Redirect after 5 seconds
      } catch (error) {
        toast.error(error.message);
        setTimeout(() => navigate('/register'), 3000);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 text-center">
          <img src={logo} alt="logo" className="w-50 mb-4" />
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="mb-4">Verificando tu cuenta</h2>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Por favor, espera mientras verificamos tu cuenta de correo...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;