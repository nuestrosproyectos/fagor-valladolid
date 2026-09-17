/* Reparación Fagor Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=', PRECIO: '60,50 €',
    MARCA: 'Fagor', MARCA_RE: /\b(FAGOR|EDESA|ASPES)\b/g, SAT_TXT: '<a href="https://www.sareteknika.com/servicio-tecnico-fagor/" rel="nofollow noopener" target="_blank">sareteknika.com</a> · 902 10 50 10', ETIQUETA: 'referencia del modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"f01-lavadora","cod":"F01 / D01 / E02","ap":"lavadora","keys":["F01","F1","D01","D1","E02","E2"],"titulo":"No entra agua","sig":"La lavadora no se llena en el tiempo previsto (unos 8 minutos): grifo, manguera, filtro de entrada o electroválvula. F01 en Mondragón, D01 en la plataforma 2008–2013, E02 en Amica 2020+.","pasos":["Comprobar que el grifo está abierto y con presión","Manguera de entrada sin dobleces ni congelada","Limpiar el filtro de la electroválvula (donde entra la manguera)"],"sem":"verde","llamar":"Con agua, presión y filtro limpio y sigue igual: electroválvula, presostato o caudalímetro."},{"id":"f02-lavadora","cod":"F02 / D02 / E03","ap":"lavadora","keys":["F02","F2","D02","D2","E03","E3"],"titulo":"No desagua","sig":"No vacía el agua en el tiempo previsto (unos 6 minutos). Es la avería número uno: filtro de la bomba obstruido o bomba con la turbina rota. Misma avería en las tres generaciones.","pasos":["Limpiar el filtro de la bomba (tapa abajo, delante), con un trapo y un recipiente","Manguera de desagüe sin dobleces ni obstrucciones","Comprobar que el sifón del fregadero no está atascado"],"sem":"verde","llamar":"Filtro limpio y sigue igual → bomba de desagüe."},{"id":"f03-lavadora","cod":"F03 / C03","ap":"lavadora","keys":["F03","F3","C03","C3"],"titulo":"Carga desequilibrada","sig":"El tambor no consigue repartir la ropa y no centrifuga por seguridad.","pasos":["Sacar la ropa y repartirla en el tambor","Si hay muy poca carga, añadir alguna prenda","Reiniciar el centrifugado"],"sem":"verde","llamar":"Si ocurre con carga normal y bien repartida: amortiguadores."},{"id":"f04-lavadora","cod":"F04 / D07 / U4","ap":"lavadora","keys":["F04","F4","D07","D7","U4"],"titulo":"Puerta no bloquea","sig":"El blocapuertas no confirma el cierre y el programa no arranca. Muy habitual en Innova con años. D07 en la plataforma 2008–2013, U4 en Amica 2020+.","pasos":["Cerrar la puerta con firmeza","Retirar ropa atrapada en la goma","Pulsar Inicio/Pausa de nuevo"],"sem":"verde","llamar":"Persiste con la puerta bien cerrada: blocapuertas."},{"id":"f05-lavadora","cod":"F05 / D05","ap":"lavadora","keys":["F05","F5","D05","D5"],"titulo":"Sonda de temperatura","sig":"La sonda NTC que mide la temperatura del agua da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre: sonda o cableado."},{"id":"f06-lavadora","cod":"F06 / D03","ap":"lavadora","keys":["F06","F6","D03","D3"],"titulo":"No calienta","sig":"El agua no alcanza la temperatura en el tiempo previsto (unos 15 minutos): resistencia o termostato.","pasos":[],"sem":"ambar","llamar":"Siempre (resistencia o termostato)."},{"id":"f07-lavadora","cod":"F07 / D10","ap":"lavadora","keys":["F07","F7","D10"],"titulo":"Sobrellenado, espuma o Aquastop","sig":"Demasiada agua o espuma en la cuba, o el sistema antifugas ha detectado agua en la base.","pasos":["Usar menos detergente, y del tipo adecuado","Si hay agua en la base o en el suelo, cerrar el grifo"],"sem":"ambar","llamar":"Siempre si se repite o si hay agua en el suelo: fuga interna."},{"id":"f08-lavadora","cod":"F08 / F09 / D04 / D06","ap":"lavadora","keys":["F08","F8","F09","F9","D04","D4","D06","D6"],"titulo":"Motor, tacómetro o tambor bloqueado","sig":"El motor no gira o la electrónica no lee su velocidad: escobillas, tacómetro, triac de la placa o algo que bloquea el tambor.","pasos":["Desenchufar y comprobar a mano que nada bloquea el tambor (aro, moneda, prenda)"],"sem":"ambar","llamar":"Siempre: escobillas, tacómetro o placa."},{"id":"f10-lavadora","cod":"F10 / F11 / F12 / F14","ap":"lavadora","keys":["F10","F11","F12","F14"],"titulo":"Fallo de placa, comunicación o presostato","sig":"Avería interna de la electrónica o del presostato de nivel.","pasos":["Desenchufar 10 minutos y volver a probar una sola vez"],"sem":"ambar","llamar":"Siempre si se repite: placa o presostato."},{"id":"f13-lavadora","cod":"F13","ap":"lavadora","keys":["F13"],"titulo":"Caudalímetro","sig":"El contador de agua no detecta caudal al llenar.","pasos":["Comprobar la presión del grifo","Limpiar el filtro de entrada de la manguera"],"sem":"verde","llamar":"Si sigue con presión y filtro limpio: caudalímetro."},{"id":"d17-lavadora","cod":"D17","ap":"lavadora","keys":["D17"],"titulo":"Posición del tambor (carga superior)","sig":"En las de carga superior de la plataforma 2008–2013, las puertas del tambor no están en la posición de apertura.","pasos":["Girar el tambor a mano hasta que las puertas queden arriba y cerrarlas bien"],"sem":"verde","llamar":"Persiste: sensor de posición del tambor."},{"id":"h-lavadora","cod":"H","ap":"lavadora","keys":["H"],"titulo":"Temperatura alta en el tambor (Amica)","sig":"En las lavadoras 2020+, la pantalla muestra H cuando el agua del tambor está aún demasiado caliente para abrir o continuar.","pasos":["Pulsar Inicio/Pausa y esperar unos minutos a que baje la temperatura","Continuar el programa"],"sem":"verde","llamar":"Si la H no desaparece pasado un rato."},{"id":"f1-lavavajillas","cod":"F1 (1 pitido)","ap":"lavavajillas","keys":["F1","F01","1PITIDO"],"titulo":"Puerta abierta o no detectada","sig":"El lavavajillas no detecta la puerta cerrada; en los Innova sin pantalla, 1 pitido.","pasos":["Cerrar la puerta con firmeza","Comprobar que las cestas están bien metidas y no la bloquean"],"sem":"verde","llamar":"Sigue: microinterruptor de la puerta."},{"id":"f2-lavavajillas","cod":"F2 / E1 (2 pitidos)","ap":"lavavajillas","keys":["F2","F02","E1","E01","2PITIDOS"],"titulo":"No entra agua","sig":"Llenado demasiado largo: grifo, presión, filtro de entrada o electroválvula. E1 en los ShineWash 2020+.","pasos":["Grifo abierto y con presión","Manguera sin dobleces","Limpiar el filtro de entrada de la manguera"],"sem":"verde","llamar":"Persiste: electroválvula."},{"id":"f3-lavavajillas","cod":"F3 (3 pitidos)","ap":"lavavajillas","keys":["F3","F03","3PITIDOS"],"titulo":"No desagua","sig":"No vacía el agua: filtros, tapa de la bomba mal puesta, manguera o sifón.","pasos":["Limpiar los filtros del fondo de la cuba","Comprobar que la tapa de la bomba está bien encajada","Manguera de desagüe y sifón sin obstrucciones"],"sem":"verde","llamar":"Persiste: bomba de desagüe."},{"id":"f4-lavavajillas","cod":"F4 / E4 (4 pitidos)","ap":"lavavajillas","keys":["F4","F04","E4","E04","4PITIDOS"],"titulo":"Rebose o Aquastop: agua en la base","sig":"Algún elemento pierde agua y el flotador de la base ha cortado el paso. E4 en los ShineWash 2020+.","pasos":["Cerrar el grifo del agua","Vaciar la bandeja inclinando el aparato unos 45° con cuidado, entre dos personas"],"sem":"ambar","llamar":"Siempre: hay una fuga interna (manguera, junta, bomba o cuba)."},{"id":"f5-lavavajillas","cod":"F5 (5 pitidos)","ap":"lavavajillas","keys":["F5","F05","5PITIDOS"],"titulo":"Sobrecalentamiento","sig":"El agua ha superado la temperatura de seguridad.","pasos":[],"sem":"ambar","llamar":"Siempre: desconecta el aparato y llama."},{"id":"f6-lavavajillas","cod":"F6 / E3 (6 pitidos)","ap":"lavavajillas","keys":["F6","F06","E3","E03","6PITIDOS"],"titulo":"No calienta","sig":"Temperatura no alcanzada: resistencia, relé o sonda. E3 en los ShineWash 2020+.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f7-lavavajillas","cod":"F7 (7 pitidos)","ap":"lavavajillas","keys":["F7","F07","7PITIDOS"],"titulo":"Sonda de temperatura NTC","sig":"La sonda da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f8-lavavajillas","cod":"F8 (8 pitidos)","ap":"lavavajillas","keys":["F8","F08","8PITIDOS"],"titulo":"Presión de agua insuficiente en los brazos","sig":"Los brazos no giran con fuerza: orificios o filtros obstruidos.","pasos":["Limpiar los orificios de los brazos aspersores","Limpiar los filtros del fondo"],"sem":"verde","llamar":"Si sigue: bomba de lavado o presostato."},{"id":"f9-lavavajillas","cod":"F9 / Ec (9 pitidos)","ap":"lavavajillas","keys":["F9","F09","EC","9PITIDOS"],"titulo":"Motor distribuidor / control de lavado","sig":"Fallo del motor que reparte el agua entre los brazos o de su control en la placa. Ec en los ShineWash 2020+.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f0-lavavajillas","cod":"F0 / Ed (10 pitidos)","ap":"lavavajillas","keys":["F0","F00","ED","10PITIDOS"],"titulo":"Comunicación placa–display","sig":"La placa de potencia y el panel no se entienden. Ed en los ShineWash 2020+.","pasos":["Cortar la corriente 30 minutos y volver a probar una vez"],"sem":"ambar","llamar":"Si se repite: placa o cableado."},{"id":"e8-lavavajillas","cod":"E8","ap":"lavavajillas","keys":["E8","E08"],"titulo":"Válvula distribuidora (orientación)","sig":"En los ShineWash 2020+, la válvula que orienta el agua no llega a su posición.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"er-frigorifico","cod":"Er / Err / símbolo de llave","ap":"frigorifico","keys":["ER","ERR","LLAVE","SIMBOLO"],"titulo":"Aviso genérico: llamar al servicio técnico","sig":"El panel pide asistencia sin decir la pieza: en los combis 2020+ es un símbolo de llamada al servicio técnico; en modelos antiguos, Er o Err.","pasos":["Desenchufar 5 minutos y volver a conectar","Comprobar que la puerta cierra bien y que no está sobrecargado"],"sem":"verde","llamar":"Si el aviso vuelve a aparecer.","aviso":1},{"id":"alarma-frigorifico","cod":"Luz roja + pitido / triángulo","ap":"frigorifico","keys":["ALARMA","PITA","PITIDO","TRIANGULO","LUZROJA"],"titulo":"Alarma de temperatura","sig":"La temperatura interior ha subido: puerta abierta más de 2 minutos (pita doble), carga reciente o corte de luz. No es un código de avería.","pasos":["Cerrar bien la puerta y comprobar la junta","No sobrecargar tras la compra; esperar 4–6 horas a que recupere","Silenciar la alarma con el botón del panel una vez comprobado"],"sem":"verde","llamar":"Si no se apaga en unas horas con la puerta cerrada: falta de frío.","aviso":1},{"id":"alarma-congelador","cod":"Luz roja + pitido","ap":"congelador","keys":["ALARMA","PITA","PITIDO","LUZROJA"],"titulo":"Alarma de temperatura","sig":"El congelador ha subido de temperatura: puerta o tapa abierta, carga reciente o corte de luz. Documentada en el congelador de los combis 2020+; en arcones antiguos, el piloto rojo tiene el mismo sentido.","pasos":["Cerrar bien la puerta o la tapa y comprobar la junta","Comprobar si ha habido un corte de luz reciente","Esperar unas horas sin abrir antes de decidir"],"sem":"verde","llamar":"Si la alarma vuelve sin corte de luz ni puerta abierta.","aviso":1},{"id":"f01-horno","cod":"F01","ap":"horno","keys":["F01","F1"],"titulo":"Sonda de temperatura","sig":"La sonda que mide la temperatura del horno da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f02-horno","cod":"F02","ap":"horno","keys":["F02","F2"],"titulo":"Puerta bloqueada","sig":"El bloqueo de seguridad sigue activo: tras una pirólisis es normal hasta que el horno enfría.","pasos":["Esperar a que el horno enfríe del todo tras la pirólisis","No forzar la puerta"],"sem":"verde","llamar":"Si en frío sigue bloqueada: cierre o sensor."},{"id":"f03-horno","cod":"F03","ap":"horno","keys":["F03","F3"],"titulo":"No puede iniciar la pirólisis","sig":"El horno no arranca la limpieza pirolítica: puerta mal cerrada o accesorios dentro.","pasos":["Cerrar bien la puerta","Sacar bandejas, rejillas y guías laterales"],"sem":"verde","llamar":"Si se repite: sensor o cierre de puerta."},{"id":"f04-horno","cod":"F04","ap":"horno","keys":["F04","F4"],"titulo":"Fallo del bloqueo de puerta","sig":"El mecanismo que bloquea la puerta durante la pirólisis no responde.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f05-horno","cod":"F05","ap":"horno","keys":["F05","F5"],"titulo":"Fallo de software","sig":"La electrónica del horno se ha bloqueado.","pasos":["Cortar la corriente en el cuadro 5 minutos y volver a conectar"],"sem":"ambar","llamar":"Si se repite: placa electrónica."},{"id":"f06-horno","cod":"F06","ap":"horno","keys":["F06","F6"],"titulo":"Sensor de humedad (función vapor)","sig":"En los hornos con vapor, el sensor de humedad da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f10-horno","cod":"F10","ap":"horno","keys":["F10"],"titulo":"Corte de corriente durante el cocinado","sig":"Ha habido un corte de luz mientras el horno funcionaba; el programa se ha interrumpido.","pasos":["Volver a programar y reanudar el cocinado"],"sem":"verde","llamar":"No hace falta, salvo que se repita sin cortes de luz."},{"id":"auto-horno","cod":"AuTo","ap":"horno","keys":["AUTO"],"titulo":"Apagado automático por uso prolongado","sig":"El horno se ha apagado solo tras muchas horas encendido: es una función de seguridad, no una avería.","pasos":["Apagar y volver a programar el horno"],"sem":"verde","llamar":"No es una avería."},{"id":"f1-caldera","cod":"F1","ap":"caldera","keys":["F1","F01"],"titulo":"Fallo de encendido (sin llama)","sig":"La caldera no detecta llama al arrancar: llave de gas cerrada, electrodo sucio o válvula de gas.","pasos":["Comprobar que la llave de gas está abierta","Rearmar una sola vez: interruptor a O y de nuevo a I"],"sem":"verde","llamar":"Si vuelve a marcar F1: electrodo o válvula de gas. Si hueles a gas, no rearmes: cierra la llave y llama a tu distribuidora."},{"id":"f2-caldera","cod":"F2","ap":"caldera","keys":["F2","F02"],"titulo":"Presostato de aire / evacuación de humos","sig":"La caldera no confirma que los humos salen correctamente.","pasos":[],"sem":"ambar","llamar":"Siempre. No toques la salida de humos."},{"id":"f3-caldera","cod":"F3","ap":"caldera","keys":["F3","F03"],"titulo":"Presión del circuito fuera de rango","sig":"Por debajo de 0,6 bar o por encima de 2,8 bar en el manómetro.","pasos":["Mirar el manómetro de la caldera","Si está baja, rellenar con la llave de llenado hasta 1–1,5 bar y cerrarla"],"sem":"verde","llamar":"Si pierde presión a diario o supera 2,8 bar: fuga, válvula de llenado o vaso de expansión."},{"id":"f4-caldera","cod":"F4","ap":"caldera","keys":["F4","F04"],"titulo":"Termostato de seguridad (más de 100 °C)","sig":"La caldera se ha sobrecalentado y se ha parado por seguridad.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f5-caldera","cod":"F5","ap":"caldera","keys":["F5","F05"],"titulo":"Placa electrónica","sig":"Avería interna de la electrónica de la caldera.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f6-caldera","cod":"F6","ap":"caldera","keys":["F6","F06"],"titulo":"Llama falsa","sig":"La electrónica detecta llama con el quemador apagado.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f10-caldera","cod":"F10","ap":"caldera","keys":["F10"],"titulo":"Válvula de gas bloqueada","sig":"La válvula de gas no se puede desbloquear.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f11-caldera","cod":"F11 / F13","ap":"caldera","keys":["F11","F13"],"titulo":"Termistor de ACS / salida del intercambiador","sig":"Fallo en la sonda del agua caliente sanitaria (F11) o en la de salida del intercambiador (F13).","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f0-calentador","cod":"F0","ap":"calentador","keys":["F0","F00"],"titulo":"Sonda de temperatura ACS","sig":"La sonda que mide la temperatura del agua caliente da una lectura fuera de rango.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f1-calentador","cod":"F1 / E1","ap":"calentador","keys":["F1","F01","E1","E01"],"titulo":"No enciende el quemador","sig":"El calentador no consigue llama: gas cerrado, pilas agotadas en los modelos a pilas o electrodo.","pasos":["Comprobar que la llave de gas está abierta","Poner pilas nuevas si el modelo funciona a pilas","Abrir un grifo de agua caliente para purgar el circuito"],"sem":"verde","llamar":"Si repite: electrodo, válvula o electrónica. Si hueles a gas, cierra la llave y llama a tu distribuidora."},{"id":"f2-calentador","cod":"F2","ap":"calentador","keys":["F2","F02"],"titulo":"Control de evacuación de humos","sig":"El calentador no confirma que los humos salen correctamente y se apaga por seguridad.","pasos":[],"sem":"ambar","llamar":"Siempre. No manipules ni tapes la salida de humos."},{"id":"f3-calentador","cod":"F3","ap":"calentador","keys":["F3","F03"],"titulo":"Se apaga en funcionamiento","sig":"La llama se pierde con el calentador en marcha.","pasos":[],"sem":"ambar","llamar":"Siempre."},{"id":"f7-calentador","cod":"F7","ap":"calentador","keys":["F7","F07"],"titulo":"Agua por encima de 70 °C","sig":"El agua sale demasiado caliente y el calentador se protege.","pasos":["Bajar la potencia o la temperatura seleccionada","Abrir más el grifo de agua caliente"],"sem":"verde","llamar":"Si repite con la temperatura baja: sonda o regulador."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"caldera":{"id":"caldera","nombre":"Caldera","art":"una caldera","slug":"caldera"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"calentador":{"id":"calentador","nombre":"Calentador de agua","art":"un calentador","slug":"calentador"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      /* al cambiar de aparato se empieza de cero: el código anterior no se arrastra */
      input.value = ''; x.classList.remove('on'); limpia(); if (res) res.innerHTML = '';
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'), km = z.getAttribute('data-km'); Z.set(n);
      var dist = km === 'capital' ? 'Valladolid capital' : 'a ' + km + ' km del centro de Valladolid, dentro de nuestro radio de 20 km';
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + ' · ' + dist + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
    /* el anillo de 20 km también responde: explica el área de actuación */
    var an = $('.anillo-20', mapa);
    if (an) {
      var radio = function () {
        zs.forEach(function (o) { o.classList.remove('on'); }); an.classList.add('on');
        info.innerHTML = '<p class="kicker">Área de actuación</p><h3>' + an.getAttribute('data-radio') + ' km a la redonda de Valladolid</h3><p>Todo lo que ves dentro del círculo lo cubrimos con el mismo precio de visita: ' + CONFIG.PRECIO + ' IVA incl., descontados si reparas. Si tu pueblo no aparece en el mapa pero está dentro del radio, también vamos: escríbenos y te lo confirmamos.</p>' +
          '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, ¿venís a mi zona? Estoy en ') + '">' + ico('wa') + 'Preguntar por mi pueblo</a><a class="btn btn-ghost btn-sm" href="' + CONFIG.TEL_HREF + '">Llamar · ' + CONFIG.TEL + '</a></div>';
      };
      an.addEventListener('click', radio); an.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); radio(); } });
      zs.forEach(function (z) { z.addEventListener('click', function () { an.classList.remove('on'); }); });
    }
  }
})();
