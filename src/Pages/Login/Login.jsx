import { LoginForm } from "../../components/auth/LoginForm/LoginForm"
import { Link } from 'react-router-dom';



export const Login = ()=>{
    
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white radius" >
                            <div className="card-body p-5 text-center">
                                <LoginForm  />
                                <div className='pt-5'>
                                    <p className="mb-0">No tienes una cuenta? <Link to='/registro' className="text-white-50 fw-bold">Registrate</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}