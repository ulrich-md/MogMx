# LV — logo sting (draw-on)

Intro animado para la escuela **LV** (secundaria / preparatoria). Formato 9:16,
1080×1920, 30 fps, 3.5 s.

> **Esta carpeta no forma parte del sitio de MOG México.** El logo LV es otra marca;
> vive aquí aislada, fuera de `src/`, para no entrar al build de mogmx.com.

---

## Estado actual: MOTION STUDY, no entregable final

`study.html` usa **geometría placeholder**, no el logo real:

- los dos óvalos son arcos elípticos abiertos aproximados;
- el "LV" es **Georgia italic**, que no es el lettering caligráfico de la marca.

Lo que el estudio sí sirve para aprobar: **coreografía, timing, easing, color de
fondo y energía**. La forma se reemplaza en el paso siguiente.

---

## Por qué draw-on en código y no en un generador de video

Un draw-on es un trazo revelado progresivamente a lo largo de su propia
trayectoria — `stroke-dasharray` / `stroke-dashoffset` sobre un `path`. Es una
operación **vectorial**: requiere saber que el trazo tiene inicio, dirección y
final.

Un modelo de difusión (Higgsfield / Kling / Seedance) no tiene ese concepto. Solo
puede generar frames que *se parezcan* a algo medio dibujado, y la forma baila
entre frame y frame. En este logo el primer detalle que se derrite es la salida
fina de la V.

Consecuencia práctica: **el logo se anima en código**, siempre exacto y con
re-render gratis. Los generadores se reservan para lo que sí hacen bien —
B-roll fotográfico real (salones, alumnos, texturas).

---

## Mapa de tiempos

| Beat | Ventana | Qué pasa | Easing |
|---|---|---|---|
| 1 | 0.05 – 0.80 s | El óvalo verde se dibuja mientras rota −17° → 0° | `power3.out` |
| 2 | 0.28 – 1.02 s | El arco dorado se dibuja contra-rotando +19° → 0° | `power3.out` |
| 3 | 0.85 – 1.60 s | El LV se escribe de izquierda a derecha, con overshoot | `power4.out` + `back.out` |
| 4 | 1.52 – 2.05 s | El snap: barrido de luz sobre el mark + bloom en los trazos | seno |
| 5 | 2.05 – 3.50 s | Asentamiento y hold, con respiración mínima | `expo.out` |

El escalonamiento **no es decorativo**: los dos óvalos corren casi paralelos y se
cruzan en varios puntos. Si entran al mismo tiempo generan moiré y el ojo no
distingue una línea de la otra. Verde primero (estructura), oro después (acento),
LV al final (firma).

La contra-rotación sale de la geometría del propio logo: los dos óvalos ya están
desfasados entre sí, así que dibujarlos mientras rotan hasta su alineación final
usa una tensión que la marca ya tiene, en vez de imponerle una ajena.

---

## Cómo renderizar

```bash
./render.sh                       # -> LV_draw-on_1080x1920.mp4
CHROME=/path/to/headless_shell ./render.sh
```

La animación es una **función pura** del parámetro `?f=<frame>`: cada frame es
determinista y la captura no puede desincronizarse de un reloj de animación. Por
eso la página recibe un número de frame en vez de reproducirse con temporizador.

Para previsualizar en vivo, abre `study.html` sin `?f=` y se reproduce en loop.

---

## Pendientes (bloqueantes para el entregable final)

1. **El SVG del logo.** El PNG disponible es de 741×741 — techo de calidad de
   todo, y además un raster no se puede animar por trazo. Con el vector, los
   `path` reales entran directo en lugar de los arcos aproximados.
2. **El wordmark.** Falta el nombre de la escuela. Un intro que resuelve en "LV"
   y nada más no comunica a quien no conoce la institución. El espacio bajo el
   mark está reservado para esa línea.
3. **Lockup reverso — decisión de marca.** Sobre fondo oscuro el logo positivo
   muere: el LV es teal oscuro y el óvalo exterior verde oscuro, ambos se hunden.
   Los valores usados aquí son una **propuesta**, no aprobados:

   | Capa | Positivo (original) | Propuesta sobre oscuro |
   |---|---|---|
   | Óvalo exterior | verde oscuro | `#57B583` |
   | Óvalo interior | oro | `#EDBE63` |
   | Lettering LV | teal oscuro | `#F7F1E4` |

4. **Audio.** Un whoosh con cola de reverb + impacto suave en el snap (1.52 s).
   El sonido vende un sting más que la imagen.
5. **Otros formatos.** 1:1 y 16:9 salen del mismo `study.html` ajustando el
   `viewBox` y el `--window-size`; el logo es vectorial, así que no hay pérdida.

---

## Si se porta a React

El repo ya tiene `gsap@3.12.5` y `framer-motion@11`. La versión de producción
sería un componente con el SVG real y un timeline de GSAP replicando el mapa de
tiempos de arriba, respetando `prefers-reduced-motion` (mostrar el lockup final
estático, sin animación).
