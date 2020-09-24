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
