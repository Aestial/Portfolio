# Generated by Django 3.0.5 on 2020-05-02 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0006_auto_20200502_0339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobimage',
            name='image',
            field=models.ImageField(default='/default/img.png', upload_to='images/jobs/'),
        ),
    ]