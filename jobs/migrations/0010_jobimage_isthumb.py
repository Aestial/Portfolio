# Generated by Django 3.0.5 on 2020-05-03 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_auto_20200502_2259'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobimage',
            name='isThumb',
            field=models.BooleanField(default=False),
        ),
    ]