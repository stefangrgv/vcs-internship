# Generated by Django 4.0.6 on 2022-07-28 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_link_url_parsed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='description',
            field=models.TextField(
                blank=True,
                editable=False,
                max_length=200,
                null=True
            ),
        ),
        migrations.AlterField(
            model_name='link',
            name='thumbnail',
            field=models.URLField(
                blank=True,
                default='',
                editable=False,
                max_length=100,
                null=True
            ),
        ),
        migrations.AlterField(
            model_name='link',
            name='url',
            field=models.URLField(max_length=100, unique=True),
        ),
    ]
