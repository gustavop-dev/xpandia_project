from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import BlogPost
from .serializers import BlogPostDetailSerializer, BlogPostListSerializer


def _int_param(params, key, default, *, min_val=1, max_val=None):
    try:
        value = int(params.get(key, default))
    except (TypeError, ValueError):
        value = default
    value = max(min_val, value)
    if max_val is not None:
        value = min(max_val, value)
    return value


@api_view(['GET'])
@permission_classes([AllowAny])
def list_blog_posts(request):
    qs = BlogPost.objects.filter(is_published=True)

    page = _int_param(request.query_params, 'page', 1)
    page_size = _int_param(request.query_params, 'page_size', 9, max_val=50)

    total = qs.count()
    total_pages = max(1, (total + page_size - 1) // page_size)
    page = min(page, total_pages)
    start = (page - 1) * page_size
    posts = qs[start:start + page_size]

    serializer = BlogPostListSerializer(posts, many=True, context={'request': request})
    return Response({
        'results': serializer.data,
        'count': total,
        'page': page,
        'page_size': page_size,
        'total_pages': total_pages,
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def retrieve_blog_post(request, slug):
    try:
        post = BlogPost.objects.get(slug=slug, is_published=True)
    except BlogPost.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    serializer = BlogPostDetailSerializer(post, context={'request': request})
    return Response(serializer.data)
