# Generated by Django 3.0.7 on 2020-07-05 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0016_auto_20200705_0003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='body',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='job',
            name='summary',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='job',
            name='tags',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='jobembed',
            name='description',
            field=models.CharField(blank=True, default='Embed description', max_length=140),
        ),
        migrations.AlterField(
            model_name='jobembed',
            name='title',
            field=models.CharField(blank=True, default='Embed title', max_length=80),
        ),
        migrations.AlterField(
            model_name='jobimage',
            name='description',
            field=models.CharField(blank=True, default='Image description', max_length=140),
        ),
        migrations.AlterField(
            model_name='jobimage',
            name='title',
            field=models.CharField(blank=True, default='Image title', max_length=80),
        ),
    ]
