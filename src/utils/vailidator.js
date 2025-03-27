
//Función para validar formulario identificando errores
export const validateLogin = (userData, setErrores) => {
    const errores = [];

    if (!userData.email) {
        errores.push({ campo: "email", mensaje: "Debes ingresar un email" });
    }
    if (!userData.password) {
        errores.push({
            campo: "password",
            mensaje: "Debes ingresar una contraseña",
        });
    }
    if (userData.password.length < 6) {
        errores.push({
            campo: "password",
            mensaje: "La contraseña no puede ser menor a 6 caracteres",
        });
    }

    setErrores(errores);
    return errores.length === 0; //Devuelve true si no hay errores y false si hay errores
};