# Generated by Django 3.0.5 on 2020-05-03 23:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0011_auto_20200503_2325'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobimage',
            old_name='isthumb',
            new_name='is_cover',
        ),
    ]