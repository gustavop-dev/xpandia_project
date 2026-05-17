# -*- coding: utf-8 -*-
import mimetypes
import os

from django.contrib.staticfiles import finders
from django.templatetags.static import static


def check_ajax(request):
	if not hasattr(request, '_django_attachments_ajax'):
		accept = request.META.get('HTTP_ACCEPT', '')
		accept_types = set(
			mime.split(';')[0].strip()
			for mime in accept.split(',')
			if mime.split(';')[0].strip()
		)
		request._django_attachments_ajax = 'application/json' in accept_types
	return request._django_attachments_ajax


def parse_mimetype(filename):
	mimetype = (mimetypes.guess_type(filename)[0] or '')[:200]
	mime_components = [d for d in mimetype.split('/') if d != '..' and d != '']
	if mime_components:
		mime_url_part = '/'.join(mime_components)
		safe_mimetype = os.path.join(*mime_components)
		mime_url = 'django_attachments/img/mimetypes/%s.png' % mime_url_part
		result = finders.find(os.path.join('django_attachments', 'img', 'mimetypes', safe_mimetype) + '.png')
	else:
		result = None
	if result is None:
		mime_url = 'django_attachments/img/mimetypes/application/octet-stream.png'
	return {
		'mimetype': mimetype,
		'mimetype_url': static(mime_url)
	}
