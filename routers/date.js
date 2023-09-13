const express = require('express'); 

const routerDate = express.Router();

routerDate.get('/', (req, res) => {
  res.redirect('/api/'+new Date())
})

routerDate.get('/:date', (req, res) => {
    let fechaUrl = req.params.date;
    let resp;
  
    try {
        let fecha;
        
       if (/^\d{13}$/.test(fechaUrl)){
          fecha = new Date(parseInt(fechaUrl));
        } else {
          fecha = new Date(fechaUrl)
        }
      
        if (isNaN(fecha)) {
            throw new Error("Invalid Date");
        }
    
        const opFecha = { diaSemana: {weekday: 'short'}, año: {year: 'numeric'}, mes: {month: 'short'}};
        const diaSem = fecha.toLocaleDateString('en', opFecha.diaSemana); 
        const mes = fecha.toLocaleDateString('en', {month: 'short'}); 
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const año = fecha.toLocaleDateString('en', opFecha.año);
        let hora = fecha.toLocaleTimeString(undefined, {hour12: false});
        hora = hora.replace(/^24:/, '00:');
        const unixFecha = fecha.getTime();
        const utcFecha = `${diaSem}, ${dia} ${mes} ${año} ${hora}`;
    
        resObj = {unix: unixFecha, utc: utcFecha + " GMT"}
      
    } catch (error) {
        resObj = {error: error.message};
    }
  
    res.json(resObj);
})

module.exports = routerDate; //para exportar el router
