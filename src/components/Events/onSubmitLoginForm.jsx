
import { auth } from "../../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";


export const onSubmitLoginForm = async (data,navegar) => {
    try {
        Swal.fire({
            title: 'Verificando credenciales...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.pass)
        const user = userCredential.user;
        console.log(user)

        Swal.fire({
            icon: 'success',
            title: 'Felicidades, credenciales validadas!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navegar('/home')
        });
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos Incorrectos!',
            text: 'Por favor, verifica tus credenciales e intentalo nuevamente.',
            confirmButtonText: 'Entendido'
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode)
    }
};