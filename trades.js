const  loadJson  = ( url , callback ) => {
    const  xhttp  =  new  XMLHttpRequest ();
    xhttp . onreadystatechange  =  function () {
      if ( this . readyState  ==  4  &&  this . status  ==  200 ) {
        devolución de llamada ( esta . respuesta );
      }
    }
    xhttp . responseType  =  ' json ' ;
    xhttp . open ( ' GET ' , url, verdadero );
    xhttp . enviar ();
  }

var priceChartConfig = {
  tipo :  ' barra ' ,
  datos : {},
  opciones : {
    spanGaps :  cierto ,
    leyenda : {
      posición :  ' arriba ' ,
      pantalla :  verdadero
    },
    receptivo :  cierto ,
    título : {
      pantalla :  verdadero ,
      texto :  ' Gráfico '
    },
    información sobre herramientas : {
      modo :  ' índice ' ,
    },
    hover : {
      modo :  ' índice '
    },
    escalas : {
      xAxes : [{
        scaleLabel : {
          pantalla :  verdadero ,
          labelString :  ' fecha '
        }
      }],
      yAxes : [{
        apilado :  falso ,
        id :  ' nano ' ,
        posición :  ' izquierda ' ,
        scaleLabel : {
          pantalla :  verdadero ,
          labelString :  ' nano '
        }
      }, {
        apilado :  falso ,
        id :  ' banano ' ,
        posición :  ' izquierda ' ,
        scaleLabel : {
          pantalla :  verdadero ,
          labelString :  ' banano '
        }
      }, {
        apilado :  cierto ,
        id :  ' transacciones ' ,
        posición :  ' derecha ' ,
        scaleLabel : {
          pantalla :  verdadero ,
          labelString :  ' transacciones '
        }
      }, {
        apilado :  falso ,
        id :  ' ratio ' ,
        posición :  ' derecha ' ,
        scaleLabel : {
          pantalla :  verdadero ,
          labelString :  ' ratio '
        }
      }]
    }
  }
};

función  devolución de llamada ( respuesta ) {
  const  data  = {};
  datos . labels  = [];
  datos . datasets  = [];
  const  txDs  = {};
  const  nanosDs  = {};
  const  bananosDs  = {};

  txDs . label  =  ' transacciones ' ;
  nanosDs . label  =  ' nano ' ;
  bananosDs . label  =  ' banano ' ;

  txDs . oculto  =  falso ;
  nanosDs . oculto  =  verdadero ;
  bananosDs . oculto  =  falso ;

  txDs . borderColor  =  ' # 000000 ' ;
  nanosDs . borderColor  =  ' # 7777AA ' ;
  bananosDs . borderColor  =  ' # AAAA00 ' ;

  datos . conjuntos de datos . push (txDs);
  datos . conjuntos de datos . push (nanosDs);
  datos . conjuntos de datos . empujar (bananosDs);

  for ( let ix =  0 ; ix <  data . datasets . length ; ix ++ ) {
    datos . conjuntos de datos [ix]. data  = [];
    datos . conjuntos de datos [ix]. backgroundColor  =  ' rgb (255,255,255) ' ;
    datos . conjuntos de datos [ix]. steppedLine  =  false ;
    datos . conjuntos de datos [ix]. fill  =  false ;
    datos . conjuntos de datos [ix]. tipo  =  ' línea ' ;
    datos . conjuntos de datos [ix]. yAxisID  =  datos . conjuntos de datos [ix]. etiqueta ;
  }

  priceChartConfig . datos  = datos;

  const  eltByDate  = {};

  let lastIx =  0 ;

  respuesta . datos  =  respuesta . datos . reverse ();

  for ( let ix =  0 ; ix <  response . data . length ; ix ++ ) {
    const  elt  =  respuesta . datos [ix];
    const  date  =  elt . fecha . subcadena ( 0 , 10 );

    if (eltByDate [date] ==  undefined ) {
      // console.log ('nueva fecha', ix, fecha);
      eltByDate [date] = lastIx;
      lastIx ++ ;
    } else {
      // console.log ('fecha anterior', ix, fecha, eltByDate [fecha]);
    }

    const  dataIx  = eltByDate [date];

    // console.log ('date ix', date, dataIx);

    if ( data . labels [dataIx] ==  undefined ) {
      // console.log ('nueva etiqueta', dataIx, fecha);
      datos . labels [dataIx] = fecha;
    }

    if ( txDs . data [dataIx] ==  undefined ) {
      txDs . datos [dataIx] =  0 ;
    }

    if ( nanosDs . data [dataIx] ==  undefined ) {
      nanosDs . datos [dataIx] =  0 ;
    }

    if ( bananosDs . data [dataIx] ==  undefined ) {
      bananosDs . datos [dataIx] =  0 ;
    }

    txDs . datos [dataIx] ++ ;
    nanosDs . datos [dataIx] + =  elt . nano ;
    bananosDs . datos [dataIx] + =  elt . banano ;
  }

  for ( let ix =  0 ; ix <  data . labels . length ; ix ++ ) {
    nanosDs . datos [ix] / =  1000000 ;
  }

  // console.log (priceChartConfig.data);

  var ctx =  documento . getElementById ( ' price-canvas ' ). getContext ( ' 2d ' );
  ventana . myLine  =  new  Chart (ctx, priceChartConfig);
}

ventana . onload  =  function () {
  loadJson ( ' trades.json ' , devolución de llamada);
};
