# Generated by Django 4.0 on 2023-05-13 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todonote',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
