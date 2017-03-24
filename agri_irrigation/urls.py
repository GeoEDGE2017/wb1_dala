from django.conf.urls import include, url


urlpatterns = [
    url(r'^base_line/', include('agri_irrigation.base_line.urls', namespace='base_line')),
    url(r'^damage_losses/', include('agri_irrigation.damage_losses.urls', namespace='damage_losses')),
]