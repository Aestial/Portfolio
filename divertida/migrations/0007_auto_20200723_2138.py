# Generated by Django 3.0.7 on 2020-07-23 21:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('divertida', '0006_auto_20200723_2133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instructions',
            name='instructions',
        ),
        migrations.AddField(
            model_name='instructions',
            name='card',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='card', to='divertida.Card'),
        ),
        migrations.AlterField(
            model_name='card',
            name='book',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='book', to='divertida.Book'),
        ),
    ]
