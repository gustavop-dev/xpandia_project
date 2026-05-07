from django.core.management import call_command
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """
    To generate fake data via console, run:
    python3 manage.py create_fake_data [numbers_of_records] (optional)

    Examples:
    python3 manage.py create_fake_data 20
    python3 manage.py create_fake_data --users 10
    """

    help = 'Create fake data in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_records', type=int, nargs='?', default=None)
        parser.add_argument('--users', type=int, default=10)
        parser.add_argument('--blog-posts', type=int, default=8)

    def handle(self, *args, **options):
        number_of_records = options['number_of_records']
        if number_of_records is not None:
            users = number_of_records
            blog_posts = number_of_records
        else:
            users = options['users']
            blog_posts = options['blog_posts']

        self.stdout.write(self.style.SUCCESS('==== Creating Fake Data ===='))

        self.stdout.write(self.style.SUCCESS('\n--- Creating Users ---'))
        call_command('create_users', number_of_users=users)

        self.stdout.write(self.style.SUCCESS('\n--- Creating Blog Posts ---'))
        call_command('create_blog_posts', number_of_posts=blog_posts)

        self.stdout.write(self.style.SUCCESS('\n==== Fake Data Creation Complete ===='))
