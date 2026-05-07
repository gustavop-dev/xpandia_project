from django.contrib import admin

from base_feature_app.admin import admin_site

from .models import BlogPost


class BlogPostAdmin(admin.ModelAdmin):
    list_display = (
        'title_en', 'title_es', 'slug', 'category', 'author',
        'is_published', 'published_at', 'updated_at',
    )
    list_filter = ('is_published', 'category', 'author')
    search_fields = ('title_es', 'title_en', 'excerpt_es', 'excerpt_en', 'slug')
    prepopulated_fields = {'slug': ('title_en',)}
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('English', {'fields': ('title_en', 'excerpt_en', 'content_json_en')}),
        ('Español', {'fields': ('title_es', 'excerpt_es', 'content_json_es')}),
        ('Metadata', {'fields': ('slug', 'cover_image', 'category', 'author')}),
        ('Publishing', {'fields': ('is_published', 'published_at')}),
        ('Timestamps', {'classes': ('collapse',), 'fields': ('created_at', 'updated_at')}),
    )


admin_site.register(BlogPost, BlogPostAdmin)
