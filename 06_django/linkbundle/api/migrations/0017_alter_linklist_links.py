# Generated by Django 4.0.6 on 2022-08-02 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_linklistitem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='linklist',
            name='links',
        ),
        migrations.AddField(
            model_name='linklist',
            name='links',
            field=models.ManyToManyField(
                through='api.LinkListItem',
                to='api.link'
            ),
        ),
    ]