from django.db import models
from datetime import datetime

# Create a Job
class Job(models.Model):
    title = models.CharField(max_length=140, default="Job title")
    summary = models.CharField(max_length=200)
    body = models.TextField(default="HTML Body!")
    tags = models.CharField(max_length=255, default="")
    start_date = models.DateField(default=datetime.now, blank=True)
    is_pinned = models.BooleanField(default=False)

    def cover(self):
        return self.images.filter(is_cover=True).first()

    def start_date_pretty(self):
        return self.start_date.strftime('%b, %Y')

    def __str__(self):
        return self.title

    class Meta():
        ordering = ['-is_pinned', '-start_date']

class JobImage(models.Model):
    job = models.ForeignKey(Job, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/jobs/', default='/default/img.png')        
    description = models.CharField(max_length=80, default="Image description")
    title = models.CharField(max_length=50, default="Image title")
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return self.title

