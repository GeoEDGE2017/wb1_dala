from django.conf.urls import include, url


urlpatterns = [
    url(r'^base_line/', include('health.base_line.urls', namespace='base_line')),
    url(r'^damage_losses/', include('health.damage_losses.urls', namespace='damage_losses')),
]
