SUPPORTED_LANGS = ('es', 'en')
DEFAULT_LANG = 'en'


def resolve_lang(request):
    """Return the requested content language, falling back to the default."""
    if request is None:
        return DEFAULT_LANG
    lang = request.query_params.get('lang', DEFAULT_LANG)
    return lang if lang in SUPPORTED_LANGS else DEFAULT_LANG


def translated_posts(queryset, lang):
    """Restrict a BlogPost queryset to posts that have a body in ``lang``.

    Titles and excerpts are required in both languages at the model level, so an
    empty ``content_json_<lang>`` is the only way a post can end up rendering the
    other language to the reader.
    """
    return queryset.exclude(**{f'content_json_{lang}': {}})
