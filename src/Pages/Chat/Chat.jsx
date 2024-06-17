import { useState, useEffect, useRef } from 'react';
import { useUserInfo } from '../../components/Hooks/useUserInfo'; // hook para obtener información del usuario
import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import Swal from 'sweetalert2'; 
import '../../components/auth/css/ChatViewHome.css'; 

export const Chat = () => {
    const [mensajes, setMensajes] = useState([]); // Estado para almacenar los mensajes del chat
    const [newMensaje, setNewMensaje] = useState(''); // Estado para almacenar el nuevo mensaje a enviar
    const [collectionEmpty, setCollectionEmpty] = useState(true); // Estado para verificar si la colección de mensajes está vacía
    const mensanjeEndRef = useRef(null); // Referencia para scroll al final del chat
    const userInfo = useUserInfo(); // Obtiene la información del usuario usando un hook

    // Función asincrónica para verificar si la colección de mensajes existe; si está vacía, actualiza el estado correspondiente
    const createIfNotExistsCollection = async () => {
        try {
            const q = query(collection(db, 'mensajes'), limit(1)); // Consulta limitada
            const querySnapshot = await getDocs(q); // Obtiene el snapshot de documentos

            // Actualiza el estado de collectionEmpty basado en si la consulta está vacía o no
            setCollectionEmpty(querySnapshot.empty);
        } catch (error) {
            console.log('Error al verificar la colección:', error); 
        }
    };

    // Efecto secundario para cargar mensajes y suscribirse a cambios en tiempo real
    useEffect(() => {
        createIfNotExistsCollection(); // Verifica la existencia de la colección al cargar el componente
        const q = query(collection(db, 'mensajes'), orderBy('timestamp', 'asc')); // Consulta ordenada por timestamp

        // Suscripción a cambios en la colección de mensajes
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mssj = [];
            querySnapshot.forEach((doc) => {
                mssj.push(doc.data()); // Agrega datos de cada documento al array de mensajes
            });
            setMensajes(mssj); // Actualiza el estado de mensajes con el array actualizado
            scrollToBottom(); // Desplaza hacia abajo para mostrar el último mensaje
        });

        return () => unsubscribe(); // Función de limpieza para cancelar la suscripción al desmontar el componente
    }, []); // El efecto se ejecuta solo una vez al montar el componente

    // Función para desplazarse hacia abajo en el chat al agregar nuevos mensajes
    const scrollToBottom = () => {
        mensanjeEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        return;
    };

    // Función para enviar un nuevo mensaje
    const sendMensaje = async () => {
        if (!userInfo) {
            // Alerta si no se puede obtener la información del usuario
            Swal.fire({
                icon: 'error',
                title: 'Información no disponible',
                text: 'No se pudo obtener la información del usuario. Intenta recargar la página.',
            });
            return;
        }

        if (newMensaje.trim() === '') {
            // Alerta si el mensaje está vacío
            Swal.fire({
                icon: 'warning',
                title: 'Mensaje vacío',
                text: 'Por favor, escribe un mensaje antes de enviarlo.',
            });
            return;
        }

        try {
            // Agrega el nuevo mensaje a la colección en Firestore
            await addDoc(collection(db, 'mensajes'), {
                text: newMensaje,
                user: userInfo.name,
                timestamp: new Date(),
            });
            setNewMensaje(''); // Limpia el campo de nuevo mensaje después de enviarlo
        } catch (error) {
            // Alerta si ocurre un error al enviar el mensaje
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: 'Ocurrió un error al intentar enviar el mensaje. Intenta de nuevo.',
            });
        }
    };

    return (
        <section className='container-fluid gradient-custom p-5'>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="text-center col-md-6 align-items-center pt-5 pb-5">
                    <div className="chat-container border border-black">
                        <div className="messages">
                            {/* Mapeo de mensajes */}
                            {mensajes.map((msg, index) => (
                                <div key={index} className={`message ${msg.user === userInfo?.name ? 'sent' : 'received'}`}>
                                    <div className="message-info">
                                        <span className="user">{msg.user}</span>
                                        <span className="timestamp">{new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="text">{msg.text}</div>
                                </div>
                            ))}
                            <div ref={mensanjeEndRef} /> {/* Referencia para scroll automático al final del chat */}
                        </div>
                        {/* Condicional para mostrar el área de entrada de mensajes */}
                        {userInfo && !collectionEmpty ? (
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={newMensaje}
                                    onChange={(e) => setNewMensaje(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                />
                                <button onClick={sendMensaje}>Enviar</button>
                            </div>
                        ) : (
                            <div className="input-container">
                                <p>
                                    La colección no tiene mensajes. Escribe el primer mensaje:
                                </p>
                                <input
                                    type="text"
                                    value={newMensaje}
                                    onChange={(e) => setNewMensaje(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                />
                                <button onClick={sendMensaje}>Enviar</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-3 "></div>
            </div>
        </section>
    );
};
