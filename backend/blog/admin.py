import json

from django import forms
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, reverse
from django.utils.html import format_html

from base_feature_app.admin import admin_site

from .models import BlogPost

# Single source of truth for the downloadable template and the on-screen example.
# Mirrors exactly the shape the form parses, so a user can download it, fill it
# in, and paste/upload it back without touching any other field.
POST_JSON_TEMPLATE = {
    'slug': '',
    'category': 'ai-quality',
    'author': 'xpandia-team',
    'cover_image_url': '',
    'en': {
        'title': 'Your post title in English',
        'excerpt': 'A short 1-2 sentence summary in English.',
        'content': {
            'intro': 'Opening paragraph in English.',
            'sections': [
                {'type': 'heading', 'level': 2, 'text': 'A section heading'},
                {'type': 'paragraph', 'text': 'A paragraph of body text.'},
                {'type': 'heading', 'level': 3, 'text': 'A subsection'},
                {'type': 'list', 'items': ['First point', 'Second point']},
                {'type': 'callout', 'variant': 'tip', 'title': 'Tip', 'text': 'A highlighted note.'},
                {'type': 'quote', 'text': 'A memorable quote.', 'author': 'Someone'},
                {'type': 'image', 'url': 'https://example.com/image.jpg', 'alt': 'Alt text', 'caption': 'Optional caption'},
                {'type': 'code', 'language': 'python', 'code': "print('hello world')"},
                {'type': 'divider'},
                {'type': 'video', 'url': 'https://www.youtube.com/watch?v=VIDEO_ID', 'caption': 'Optional caption'},
                {'type': 'table', 'headers': ['Column A', 'Column B'], 'rows': [['a1', 'b1'], ['a2', 'b2']], 'caption': 'Optional caption'},
                {'type': 'cta', 'label': 'Talk to an expert', 'url': '/contact', 'text': 'Optional supporting line.'},
            ],
            'conclusion': 'Closing paragraph in English.',
        },
    },
    'es': {
        'title': 'El título de tu post en español',
        'excerpt': 'Un resumen corto de 1-2 oraciones en español.',
        'content': {
            'intro': 'Párrafo de apertura en español.',
            'sections': [
                {'type': 'heading', 'level': 2, 'text': 'Un título de sección'},
                {'type': 'paragraph', 'text': 'Un párrafo de texto.'},
                {'type': 'heading', 'level': 3, 'text': 'Una subsección'},
                {'type': 'list', 'items': ['Primer punto', 'Segundo punto']},
                {'type': 'callout', 'variant': 'tip', 'title': 'Tip', 'text': 'Una nota destacada.'},
                {'type': 'quote', 'text': 'Una cita memorable.', 'author': 'Alguien'},
                {'type': 'image', 'url': 'https://example.com/imagen.jpg', 'alt': 'Texto alternativo', 'caption': 'Epígrafe opcional'},
                {'type': 'code', 'language': 'python', 'code': "print('hola mundo')"},
                {'type': 'divider'},
                {'type': 'video', 'url': 'https://www.youtube.com/watch?v=VIDEO_ID', 'caption': 'Epígrafe opcional'},
                {'type': 'table', 'headers': ['Columna A', 'Columna B'], 'rows': [['a1', 'b1'], ['a2', 'b2']], 'caption': 'Epígrafe opcional'},
                {'type': 'cta', 'label': 'Habla con un experto', 'url': '/contact', 'text': 'Línea de apoyo opcional.'},
            ],
            'conclusion': 'Párrafo de cierre en español.',
        },
    },
}

VALID_CATEGORIES = {value for value, _label in BlogPost.CATEGORY_CHOICES}
VALID_AUTHORS = {value for value, _label in BlogPost.AUTHOR_CHOICES}

# Copy-paste prompt the editor hands to an AI assistant (ChatGPT / Claude) to
# produce a ready-to-paste post JSON. {json} is filled with the live template.
AI_PROMPT_TEMPLATE = """Sos un asistente que genera artículos de blog en formato JSON para Xpandia.
Devolvé ÚNICAMENTE un JSON válido (sin texto antes ni después) con EXACTAMENTE esta estructura:

{json}

Reglas:
1. Completá los bloques "en" (inglés) y "es" (español) con el MISMO contenido, traducido.
2. "slug": dejalo vacío ("") para autogenerarlo, o poné uno en minúsculas con guiones.
3. "category": uno de: ai-quality, localization, case-study, industry, operations.
4. "cover_image_url": poné el link DIRECTO de una imagen relevante de Unsplash (debe empezar con https://images.unsplash.com/). Elegí una imagen acorde al tema.
5. Secciones disponibles en "content.sections": heading (level 2 o 3), paragraph, list, quote, callout (variant tip/info/note/warning), code, divider, video, table, cta.
6. Usá varios "heading" para organizar el artículo: el sitio arma la tabla de contenidos y la numeración automáticamente.
7. Si te paso un link de YouTube, agregá un bloque {{"type": "video", "url": "EL_LINK_DE_YOUTUBE"}} donde corresponda.
8. NO incluyas "is_published": eso se controla con el checkbox del formulario.

Tema del artículo: ESCRIBÍ_TU_TEMA_ACÁ
Link de YouTube (opcional): PEGÁ_EL_LINK_O_DEJALO_VACÍO
"""


def _build_admin_guide(download_url):
    prompt = AI_PROMPT_TEMPLATE.format(
        json=json.dumps(POST_JSON_TEMPLATE, indent=2, ensure_ascii=False),
    )
    return format_html(
        '<div style="max-width:760px; line-height:1.5;">'
        '<p style="margin:0 0 .4em;"><strong>Cómo cargar un artículo</strong></p>'
        '<ol style="margin:0 0 1em 1.2em; padding:0;">'
        '<li>Descargá la plantilla para ver la estructura exacta: '
        '<a href="{url}" download><strong>⬇ Descargar plantilla JSON</strong></a>.</li>'
        '<li>Copiá el <em>Prompt para la IA</em> de abajo, pegalo en ChatGPT o Claude y escribí tu '
        'tema (y el link de YouTube si querés incluir un video).</li>'
        '<li>Pegá el JSON que te devuelva la IA en el campo <em>Post JSON</em>, o subilo como archivo .json.</li>'
        '<li>Marcá <em>Publish now</em> si querés publicarlo ya, y guardá.</li>'
        '</ol>'
        '<details style="margin-bottom:1em;">'
        '<summary style="cursor:pointer;"><strong>¿Qué campos y secciones tiene?</strong></summary>'
        '<ul style="margin:.6em 0 0 1.2em;">'
        '<li><code>cover_image_url</code>: link de la imagen de portada (Unsplash). Opcional — '
        'si lo dejás vacío se muestra un placeholder.</li>'
        '<li>Por idioma (<code>en</code> / <code>es</code>): <code>title</code>, <code>excerpt</code> y '
        '<code>content</code> con <code>intro</code>, <code>sections[]</code> y <code>conclusion</code>.</li>'
        '<li>Tipos de bloque para <code>sections</code>: heading, paragraph, list, quote, callout, '
        'code, divider, video, table, cta.</li>'
        '</ul></details>'
        '<p style="margin:0 0 .3em;"><strong>Prompt para la IA</strong> '
        '(hacé clic dentro, seleccioná todo con Ctrl+A y copiá):</p>'
        '<textarea readonly rows="16" style="width:100%; font-family:monospace; font-size:12px;">'
        '{prompt}</textarea>'
        '<p style="margin:.4em 0 0; color:#888;">Verificá que el link de Unsplash abra una imagen real — '
        'la IA a veces inventa URLs.</p>'
        '</div>',
        url=download_url,
        prompt=prompt,
    )


def _instance_to_json(obj):
    """Serialize an existing post back into the single-JSON shape for editing."""
    return {
        'slug': obj.slug,
        'category': obj.category,
        'author': obj.author,
        'cover_image_url': obj.cover_image_url,
        'en': {
            'title': obj.title_en,
            'excerpt': obj.excerpt_en,
            'content': obj.content_json_en or {},
        },
        'es': {
            'title': obj.title_es,
            'excerpt': obj.excerpt_es,
            'content': obj.content_json_es or {},
        },
    }


class BlogPostAdminForm(forms.ModelForm):
    post_json = forms.CharField(
        label='Post JSON',
        required=False,
        widget=forms.Textarea(attrs={'rows': 28, 'style': 'font-family:monospace; width:100%;'}),
        help_text='Paste the full bilingual post JSON here, or upload a .json file below.',
    )
    post_json_file = forms.FileField(
        label='…or upload a .json file',
        required=False,
        help_text='If a file is provided it overrides the pasted text.',
    )
    is_published = forms.BooleanField(
        label='Publish now',
        required=False,
        help_text='Leave unchecked to save as a draft. Drafts do not appear on the public blog.',
    )

    class Meta:
        model = BlogPost
        fields = []  # no raw model fields are exposed; content comes from the JSON

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['post_json'].initial = json.dumps(
                _instance_to_json(self.instance), indent=2, ensure_ascii=False,
            )
            self.fields['is_published'].initial = self.instance.is_published

    def clean(self):
        cleaned = super().clean()
        upload = cleaned.get('post_json_file')
        raw = cleaned.get('post_json', '')

        if upload is not None:
            try:
                raw = upload.read().decode('utf-8')
            except UnicodeDecodeError:
                raise forms.ValidationError('The uploaded file is not valid UTF-8 text.')

        if not raw or not raw.strip():
            raise forms.ValidationError('Provide the post JSON (paste it or upload a .json file).')

        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise forms.ValidationError(f'Invalid JSON: {exc.msg} (line {exc.lineno}, column {exc.colno}).')

        if not isinstance(data, dict):
            raise forms.ValidationError('The JSON root must be an object ({ … }).')

        errors = []
        for lang in ('en', 'es'):
            block = data.get(lang)
            if not isinstance(block, dict):
                errors.append(f'Missing "{lang}" object with title/excerpt/content.')
                continue
            if not str(block.get('title', '')).strip():
                errors.append(f'"{lang}.title" is required.')
            if not str(block.get('excerpt', '')).strip():
                errors.append(f'"{lang}.excerpt" is required.')
            content = block.get('content', {})
            if content not in (None, {}) and not isinstance(content, dict):
                errors.append(f'"{lang}.content" must be an object ({{intro, sections, conclusion}}).')

        category = data.get('category', '') or ''
        if category and category not in VALID_CATEGORIES:
            errors.append(f'"category" must be one of: {", ".join(sorted(VALID_CATEGORIES))}.')

        author = data.get('author', '') or 'xpandia-team'
        if author not in VALID_AUTHORS:
            errors.append(f'"author" must be one of: {", ".join(sorted(VALID_AUTHORS))}.')

        if errors:
            raise forms.ValidationError(errors)

        self._parsed = data
        return cleaned

    def save(self, commit=True):
        obj = super().save(commit=False)
        data = self._parsed
        en, es = data['en'], data['es']

        obj.title_en = en['title'].strip()
        obj.title_es = es['title'].strip()
        obj.excerpt_en = en['excerpt'].strip()
        obj.excerpt_es = es['excerpt'].strip()
        obj.content_json_en = en.get('content') or {}
        obj.content_json_es = es.get('content') or {}
        obj.category = data.get('category', '') or ''
        obj.author = data.get('author', '') or 'xpandia-team'
        obj.is_published = self.cleaned_data.get('is_published', False)
        obj.cover_image_url = (data.get('cover_image_url', '') or '').strip()

        slug = (data.get('slug', '') or '').strip()
        if slug:
            obj.slug = slug
        elif not obj.pk:
            obj.slug = ''  # let the model auto-generate from the English title

        if commit:
            obj.save()
        return obj


class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = (
        'title_en', 'title_es', 'slug', 'category', 'author',
        'is_published', 'published_at', 'updated_at',
    )
    list_filter = ('is_published', 'category', 'author')
    search_fields = ('title_es', 'title_en', 'excerpt_es', 'excerpt_en', 'slug')

    def get_urls(self):
        custom = [
            path(
                'download-template/',
                self.admin_site.admin_view(self.download_template),
                name='blog_blogpost_download_template',
            ),
        ]
        return custom + super().get_urls()

    def download_template(self, request):
        response = JsonResponse(
            POST_JSON_TEMPLATE,
            json_dumps_params={'indent': 2, 'ensure_ascii': False},
        )
        response['Content-Disposition'] = 'attachment; filename="blog_post_template.json"'
        return response

    def get_fieldsets(self, request, obj=None):
        url = reverse(f'{self.admin_site.name}:blog_blogpost_download_template')
        description = _build_admin_guide(url)
        return (
            ('Post JSON', {
                'description': description,
                'fields': ('post_json', 'post_json_file'),
            }),
            ('Publishing', {
                'fields': ('is_published',),
            }),
        )


admin_site.register(BlogPost, BlogPostAdmin)
