# Generated by Django 3.0.5 on 2020-05-02 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_auto_20200502_0134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='image',
            field=models.ImageField(default='/static/default/img.png', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='job',
            name='image1',
            field=models.ImageField(default='/static/default/img.png', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='job',
            name='image2',
            field=models.ImageField(default='/static/default/img.png', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='job',
            name='image3',
            field=models.ImageField(default='/static/default/img.png', upload_to='images/'),
        ),
    ]
