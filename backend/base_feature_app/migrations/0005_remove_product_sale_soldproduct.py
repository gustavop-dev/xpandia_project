from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base_feature_app', '0004_passwordcode'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Sale',
        ),
        migrations.DeleteModel(
            name='SoldProduct',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
