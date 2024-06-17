import {RegistroForm} from '../../components/auth/RegisterForm/RegisterForm'

export const Registro =()=>{

    return (
        <section className=" gradient-custom">
                <div className="container py-5 pb-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
                            <div className="card bg-dark text-white radius" >
                                <div className="card-body px-5 text-center">
                                    <RegistroForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}