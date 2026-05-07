from django.urls import path

from .views import list_blog_posts, retrieve_blog_post

urlpatterns = [
    path('', list_blog_posts, name='blog-list'),
    path('<slug:slug>/', retrieve_blog_post, name='blog-detail'),
]
