# Generated by Django 3.0.5 on 2020-05-02 03:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_auto_20200502_0149'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='image',
        ),
        migrations.RemoveField(
            model_name='job',
            name='image1',
        ),
        migrations.RemoveField(
            model_name='job',
            name='image2',
        ),
        migrations.RemoveField(
            model_name='job',
            name='image3',
        ),
        migrations.AddField(
            model_name='job',
            name='body',
            field=models.TextField(default='HTML Body!'),
        ),
        migrations.CreateModel(
            name='JobImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Image title', max_length=50)),
                ('description', models.CharField(default='Image description', max_length=80)),
                ('image', models.ImageField(default='/static/default/img.png', upload_to='images/jobs/')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='jobs.Job')),
            ],
        ),
    ]
