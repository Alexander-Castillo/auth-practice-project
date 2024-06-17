
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase/config'
import Swal from 'sweetalert2';
import { doc, setDoc } from 'firebase/firestore';


export const onSubmitRegisterForm = async (data, navegar) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.pass);
        const user = userCredential.user;

        await setDoc(doc(db, 'usuarios', user.uid), {
            name: data.name,
            birthDate: data.birthDate,
            email: data.email
        });
        Swal.fire({
            icon: 'success',
            title: 'USuario Registrado',
            text: 'El usuario fue registrado correctamente.'
        });
        navegar('/login')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el usuario, intente nuevamente'
        })

        console.error('Error al registrar Usuario', error);
    }
}