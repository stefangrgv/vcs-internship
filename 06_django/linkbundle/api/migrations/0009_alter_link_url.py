# Generated by Django 4.0.6 on 2022-07-29 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_link_description_alter_link_thumbnail_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='url',
            field=models.URLField(max_length=100),
        ),
    ]