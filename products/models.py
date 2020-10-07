from django.db import models
from datetime import datetime

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=140)
    summary = models.CharField(max_length=200, blank=True)
    body = models.TextField(default="", blank=True)
    tags = models.CharField(max_length=255, default="", blank=True)
    date = models.DateField(default=datetime.now)
    is_pinned = models.BooleanField(default=False)
    privacy = models.TextField(blank=True)
    terms = models.TextField(blank=True)
    slug = models.SlugField(default="new-product")

    def cover(self):
        return self.images.filter(is_cover=True).first()

    def date_pretty(self):
        return self.date.strftime('%b, %Y')

    def __str__(self):
        return self.title

    class Meta():
        ordering = ['-is_pinned', '-date']


class GalleryElement(models.Model):
    title = models.CharField(max_length=80, default="Element title", blank=True)
    description = models.CharField(max_length=140, default="Element description", blank=True)
    order = models.PositiveSmallIntegerField(default=0, blank=False, null=False)
    class Meta:
        abstract = True
        ordering = ['order']
    def __str__(self):
        return self.title

class GalleryEmbed(GalleryElement):
    product = models.ForeignKey(Product, related_name='embeds', on_delete=models.CASCADE)
    body = models.TextField(default="Embed iframe")

def validate_image(image):
    max_width = 1680
    max_height = 1680
    height = image.height 
    width = image.width
    error_message = "Image height or width is larger than allowed: "+str(max_width)+"x"+str(max_height)
    if width > max_width or height > max_height:
        raise ValidationError(error_message)

class GalleryImage(GalleryElement):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/products/', default='/default/img.png', validators=[validate_image])        
    is_cover = models.BooleanField(default=False)