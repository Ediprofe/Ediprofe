React2Shell: falla crítica en React y Next.js expone millones de apps (CVSS 10)
Una vulnerabilidad grave permite ejecución remota de código en servidores que usan React Server Components. Descubre cómo proteger tu aplicación.

María Bocconi
María Bocconi

05 Dec 2025  •  3 min. read

React2Shell: falla crítica en React y Next.js expone millones de apps (CVSS 10)
Se han descubierto vulnerabilidades críticas (CVSS 10) que afectan a React y Next.js, y permiten RCE (ejecución remota de código sin autenticación).

Aplicaciones que utilizan React Server Components (RSC) pueden estar en riesgo incluso sin endpoints de Server Functions expuestos.

Actualización: explotación activa de React2Shell
AWS advirtió que la vulnerabilidad React2Shell (CVE-2025-55182) ya está siendo utilizada en ataques dirigidos por grupos con nexos en China. La explotación comenzó pocas horas después de la divulgación pública y se han detectado intentos contra aplicaciones en sectores críticos como finanzas, retail y gobierno. Además, existen pruebas de concepto disponibles en GitHub, lo que aumenta el riesgo de ataques masivos.
Popularidad e impacto potencial
Estas tecnologías son muy populares (React tiene 55,8 millones de descargas semanales en NPM) y según información relevada por Wiz Research, el 39 % de los entornos cloud contienen instancias vulnerables de React y Next.js afectadas por estas fallas críticas (CVE-2025-55182 y CVE-2025-66478).

Esto significa que equipos que desarrollan aplicaciones con estos frameworks deben actuar de inmediato para evitar compromisos en producción.

Impacto en la industria
Servicios populares que dependen de React y Next.js —como plataformas de e-commerce, redes sociales, aplicaciones bancarias, herramientas de productividad y sitios de streaming— podrían estar en riesgo si no aplican los parches. Esto significa que un atacante podría comprometer servidores que alojan aplicaciones ampliamente utilizadas, afectando la disponibilidad, integridad y privacidad de millones de usuarios.

Incluso si tu aplicación no implementa endpoints de React Server Functions, puede ser vulnerable si soporta React Server Components.

Cómo puede explotarse la falla
La falla, reportada por Lachlan Davidson, surge por una deserialización insegura: el servidor no valida correctamente la estructura de los datos que recibe. Esto permite que un atacante envíe una solicitud HTTP malformada y ejecute código JavaScript con privilegios en el servidor.
En concreto, el problema ocurre al decodificar payloads del protocolo Flight de RSC, lo que abre la puerta a RCE.

Paquetes y versiones afectadas React:
Afecta configuraciones por defecto en paquetes react-server-dom-* y en Next.js App Router; incluso apps que no exponen Server Functions pueden ser vulnerables si soportan RSC.

React:
Paquetes: react-server-dom-webpack, react-server-dom-parcel, react-server-dom-turbopack.
Versiones: 19.0, 19.1.0, 19.1.1 y 19.2.0.
Next.js:
Desde 14.3.0-canary.77 y todas las ramas 15.x y 16.x antes del parche.
Otros proyectos potencialmente afectados:
Vite RSC plugin, Parcel RSC plugin, React Router RSC preview, RedwoodSDK, Waku.
Cómo proteger tu aplicación
Actualiza inmediatamente: React ≥ 19.2.1 y Next.js ≥ 16.x parcheado
Incluye la actualización en tu pipeline CI/CD.
Audita dependencias con npm audit o herramientas como Snyk.
Implementa validación estricta en datos deserializados.
Monitorea logs para detectar solicitudes malformadas.
Considera WAF (Web Application Firewall) para mitigar ataques en tránsito.
Añade pruebas de seguridad automatizadas en tu flujo de desarrollo.
Incidentes similares en el pasado
Este tipo de vulnerabilidad recuerda a fallos históricos como Log4Shell (2021), que afectó a millones de aplicaciones Java por una deserialización insegura, y a la vulnerabilidad en Apache Struts (2017) que permitió RCE masivo.

Ambos incidentes demostraron cómo errores en componentes ampliamente usados pueden convertirse en vectores de ataque globales, afectando servicios críticos y generando costos millonarios.

Conclusión
React2Shell es una alerta para toda la industria: incluso tecnologías modernas y populares no están exentas de riesgos graves. La combinación de amplia adopción, configuraciones por defecto vulnerables y exposición pública convierte esta falla en una amenaza significativa. La acción inmediata es clara: actualizar a las versiones parcheadas, auditar dependencias y aplicar controles adicionales para reducir la superficie de ataque.