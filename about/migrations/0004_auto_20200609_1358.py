# Generated by Django 3.0.5 on 2020-06-09 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0003_auto_20200609_1345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idiom',
            name='proficiency',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='skill',
            name='name',
            field=models.CharField(max_length=300),
        ),
    ]
