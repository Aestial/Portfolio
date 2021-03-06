from django.shortcuts import render, get_object_or_404
from .models import Blog

# Create your views here.
def allblogs(request):
    blogs = Blog.objects.order_by('-pub_date')
    return render(request, 'blog/allblogs.html', {'blogs':blogs, 'nav':'blog'})

def blog(request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'blog/blog.html', {'blog':blog, 'nav':'blog'})