from django.db import models
from datetime import datetime
from django.core.exceptions import ValidationError

# Create a Job

class Job(models.Model):
    title = models.CharField(max_length=140, default="Job title")
    summary = models.CharField(max_length=200, blank=True)
    body = models.TextField(default="", blank=True)
    tags = models.CharField(max_length=255, default="", blank=True)
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
        
class JobEmbed(models.Model):
    job = models.ForeignKey(Job, related_name='embeds', on_delete=models.CASCADE)
    body = models.TextField(default="Embed iframe")
    title = models.CharField(max_length=80, default="Embed title", blank=True)
    description = models.CharField(max_length=140, default="Embed description", blank=True)

    def __str__(self):
        return self.title

def validate_image(image):
    max_width = 1680
    max_height = 1050
    height = image.height 
    width = image.width
    error_message = "Image height or width is larger than allowed: "+str(max_width)+"x"+str(max_height)
    if width > max_width or height > max_height:
        raise ValidationError(error_message)

class JobImage(models.Model):
    job = models.ForeignKey(Job, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/jobs/', default='/default/img.png', validators=[validate_image])        
    title = models.CharField(max_length=80, default="Image title", blank=True)
    description = models.CharField(max_length=140, default="Image description", blank=True)    
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return self.title

