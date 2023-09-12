const express = require('express'); 

const routerDate = express.Router();

routerDate.get('/api/:date', (req, res) => {
    let fechaUrl = req.params.date;
    let resp;
  
    try {
        let fecha;
        
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(fechaUrl)) {
            fecha = new Date(fechaUrl + " 00:00:00");
        } else if (/^\d{13}$/.test(fechaUrl)){
            fecha = new Date(parseInt(fechaUrl));
        }
    
        if (isNaN(fecha)) {
            throw new Error("Error en la fecha ingresada");
        }
    
        const opFecha = { diaSemana: {weekday: 'short'}, año: {year: 'numeric'}, mes: {month: 'short'}};
        const diaSem = fecha.toLocaleDateString('en', opFecha.diaSemana); 
        const mes = fecha.toLocaleDateString('en', {month: 'short'}); 
        const dia = fecha.getUTCDate();
        const año = fecha.toLocaleDateString('en', opFecha.año);
        let hora = fecha.toLocaleTimeString(undefined, {hour12: false});
        hora = hora.replace(/^24:/, '00:');
        const unixFecha = fecha.getTime();
        const utcFecha = `${diaSem}, ${dia} ${mes} ${año} ${hora}`;
    
        console.log(`"unix": ${unixFecha}, "utc": "${utcFecha} GTM"`);
        resObj = {unix: unixFecha, utc: utcFecha + " GTM"}
      
    } catch (error) {
        console.error(error.message);
        resObj = {error: error.message};
    }
  
    res.json(resObj);
})

module.exports = routerDate; //para exportar el router
