# Generated by Django 3.0.7 on 2020-10-07 19:19

from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='Element title', max_length=80)),
                ('description', models.CharField(blank=True, default='Element description', max_length=140)),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('image', models.ImageField(default='/default/img.png', upload_to='images/products/', validators=[products.models.validate_image])),
                ('is_cover', models.BooleanField(default=False)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.Product')),
            ],
            options={
                'ordering': ['order'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GalleryEmbed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='Element title', max_length=80)),
                ('description', models.CharField(blank=True, default='Element description', max_length=140)),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('body', models.TextField(default='Embed iframe')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='embeds', to='products.Product')),
            ],
            options={
                'ordering': ['order'],
                'abstract': False,
            },
        ),
    ]
