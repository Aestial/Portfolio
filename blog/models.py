from django.db import models

#Create a Blog
class Blog(models.Model):    
    title = models.CharField(max_length=100)    
    image = models.ImageField(upload_to='images/blog/')
    pub_date = models.DateTimeField()
    content = models.TextField()

    def summary(self):
        return self.content[:33] + '...'

    def pub_date_pretty(self):
        return self.pub_date.strftime('%b %e, %Y')

    def __str__(self):
        return self.title