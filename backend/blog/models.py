from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class BlogPost(models.Model):
    AUTHOR_CHOICES = [
        ('xpandia-team', 'Xpandia Team'),
    ]
    CATEGORY_CHOICES = [
        ('ai-quality', 'AI Quality'),
        ('localization', 'Localization'),
        ('case-study', 'Case Study'),
        ('industry', 'Industry'),
        ('operations', 'Operations'),
    ]

    title_es = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt_es = models.TextField(help_text='Resumen corto en español (1-2 oraciones).')
    excerpt_en = models.TextField(help_text='Short summary in English (1-2 sentences).')
    content_json_es = models.JSONField(
        default=dict, blank=True,
        help_text='Structured content (Spanish): {intro, sections[], conclusion}.',
    )
    content_json_en = models.JSONField(
        default=dict, blank=True,
        help_text='Structured content (English): {intro, sections[], conclusion}.',
    )
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True)
    cover_image_url = models.URLField(
        max_length=500, blank=True, default='',
        help_text='External cover image URL. Takes precedence over an uploaded file.',
    )
    category = models.CharField(
        max_length=50, blank=True, default='', choices=CATEGORY_CHOICES,
    )
    author = models.CharField(
        max_length=50, default='xpandia-team', choices=AUTHOR_CHOICES,
    )
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title_en or self.title_es

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title_en or self.title_es)
            slug = base
            counter = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{counter}'
                counter += 1
            self.slug = slug
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
