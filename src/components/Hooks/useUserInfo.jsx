import { useEffect, useState } from "react"
import { auth, db } from "../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";



export const useUserInfo =()=>{

    const [infoUser,setInfoUser] = useState(null);
    useEffect(()=>{
        const fetchInfoUser = async ()=>{
            if (auth.currentUser){
                const docRef = doc(db,'usuarios', auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    setInfoUser(docSnap.data());
                    }else{
                        Swal.fire({
                            icon: 'warning',
                            title: 'Usuario no encontrado',
                            text: 'No se encontraron datos del usuario en la base de datos.',
                        }).then(() => {
                            // Forzar cierre de sesión
                            auth.signOut();
                        });
                    }
            }else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Violación de seguridad',
                    text: 'Usuario no autenticado.',
                }).then(() => {
                    // Redirigir a página de inicio de sesión u otra acción necesaria
                    // Puedes redirigir a la página de inicio de sesión o ejecutar otra acción aquí
                });
            }
        };
        fetchInfoUser();
    },[])
    return infoUser;
}