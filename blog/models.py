from django.db import models

#Create a Blog
class Blog(models.Model):    
    title = models.CharField(max_length=100)
    summary = models.CharField(max_length=140)
    image = models.ImageField(upload_to='images/blog/')
    pub_date = models.DateTimeField()
    content = models.TextField()
