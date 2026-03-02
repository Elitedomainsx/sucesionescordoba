# sucesionescordoba.com.ar (GitHub Pages + Jekyll)

## Estado
- Sitio estático con **Jekyll** (GitHub Pages) + base visual estilo **Creative** con reskin "estudio jurídico".
- **Modo construcción** activado por defecto (evita indexación) hasta que el contenido esté listo.

## Modo construcción (noindex)
En `_config.yml`:

```yml
site_noindex: true
```

Esto activa:
- `<meta name="robots" content="noindex,nofollow">` en todas las páginas (salvo que una página ponga `noindex: false`).
- `robots.txt` con `Disallow: /`.

Cuando haya contenido real (mínimo 4–6 páginas completas), cambiar a:

```yml
site_noindex: false
```

## FAQ (accordion + Schema FAQPage)
En cualquier página, agregá en el front matter:

```yml
faq:
  - q: "¿Pregunta 1?"
    a: "Respuesta en **markdown**."
  - q: "¿Pregunta 2?"
    a: "Otra respuesta."
```

En páginas con `layout: article`, el FAQ se renderiza automáticamente al final y además genera JSON-LD `FAQPage`.
