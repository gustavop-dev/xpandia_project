from rest_framework import serializers

from .models import BlogPost


def _get_lang(serializer):
    request = serializer.context.get('request')
    if request:
        lang = request.query_params.get('lang', 'en')
        return lang if lang in ('es', 'en') else 'en'
    return serializer.context.get('lang', 'en')


class BlogPostListSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    cover_image_url = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    author_display = serializers.CharField(source='get_author_display', read_only=True)

    class Meta:
        model = BlogPost
        fields = (
            'id', 'slug', 'title', 'excerpt', 'cover_image_url',
            'category', 'category_display', 'author', 'author_display',
            'published_at',
        )

    def get_title(self, obj):
        lang = _get_lang(self)
        return getattr(obj, f'title_{lang}') or obj.title_en

    def get_excerpt(self, obj):
        lang = _get_lang(self)
        return getattr(obj, f'excerpt_{lang}') or obj.excerpt_en

    def get_cover_image_url(self, obj):
        if obj.cover_image_url:
            return obj.cover_image_url
        if not obj.cover_image:
            return ''
        request = self.context.get('request')
        url = obj.cover_image.url
        return request.build_absolute_uri(url) if request else url


class BlogPostDetailSerializer(BlogPostListSerializer):
    content_json = serializers.SerializerMethodField()

    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + (
            'content_json', 'created_at', 'updated_at',
        )

    def get_content_json(self, obj):
        lang = _get_lang(self)
        return getattr(obj, f'content_json_{lang}') or obj.content_json_en or {}
