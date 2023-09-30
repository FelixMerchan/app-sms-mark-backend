const getFecha = () => {
    const objFecha = new Date();
    // adjust 0 before single digit date
    let day = ("0" + objFecha.getDate()).slice(-2);

    // current month
    let month = ("0" + (objFecha.getMonth() + 1)).slice(-2);

    // current year
    let year = objFecha.getFullYear();

    // prints date in YYYY-MM-DD format
    return year + "-" + month + "-" + day;
}

const getHora = () => {
    const objFecha = new Date();

    // current hours
    let hours = objFecha.getHours();

    // current minutes
    let minutes = objFecha.getMinutes();

    // current seconds
    let seconds = objFecha.getSeconds();

    // prints time in HH:MM format
    return hours + ":" + minutes + ":" + seconds;
}

const getFechaHora = () => {
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return getFecha() + " " + getHora();
}

module.exports = {
    getFecha, 
    getHora,
    getFechaHora
}